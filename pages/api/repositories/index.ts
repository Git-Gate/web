import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  ValidationPipe,
} from "next-api-decorators";
import {
  IsArray,
  IsEthereumAddress,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {Type} from "class-transformer";
import type {NextApiRequest} from "next";
import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {NFTStorage, File} from "nft.storage";
import {ethers} from "ethers";
import {connect} from "../../../lib/db";
import {TokenType} from "../../../lib/db/interfaces/repository";
import {RepositoryModel} from "../../../lib/db/models/repository";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {User} from "../../../lib/db/interfaces/user";
import {GithubClient} from "../../../lib/github-client";
import {getSvg} from "../../../utils";
import {
  registryContractAbi,
  soulboundFactoryContractAbi,
} from "../../../lib/smart-contract-abis";

export class CreateTokenizedRepositoryDTO {
  @IsString()
  @IsNotEmpty()
  repositoryId!: string;

  @IsString()
  @IsNotEmpty()
  repositoryName!: string;

  @IsString()
  @IsNotEmpty()
  repositoryOwner!: string;

  @Type(() => TokenRequirement)
  @ValidateNested()
  @IsNotEmpty()
  requirements!: TokenRequirement[];

  @IsArray()
  @IsOptional()
  blacklistedAddresses!: string[];

  @IsString()
  messageHash!: string;

  @IsString()
  signedMessage!: string;
}

export class TokenRequirement {
  @IsIn(Object.values(TokenType))
  type!: TokenType;

  @IsEthereumAddress()
  address!: string;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsArray()
  ids?: number[];
}

class CreateTokenizedRepositoryHandler {
  @Post()
  @JwtAuthGuard()
  public async create(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateTokenizedRepositoryDTO
  ) {
    await connect();

    const {
      repositoryId,
      repositoryName,
      repositoryOwner,
      requirements,
      blacklistedAddresses,
      signedMessage,
      messageHash,
    } = body;

    const existentRepository = await RepositoryModel.findOne({
      githubId: repositoryId,
    });

    if (existentRepository) {
      throw new BadRequestException("Repository already existing.");
    }

    const user = req.user as User;
    const githubClient = new GithubClient(user.githubToken as string);
    const repo = await githubClient.getRepository(
      repositoryOwner,
      repositoryName
    );
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.GIT_GATE_WALLET_PVT_KEY as string,
      "mumbai",
      {
        gasSettings: {
          speed: "fastest",
        },
      }
    );

    const registryContract = await sdk.getContract(
      process.env.REGISTRY_CONTRACT_ADDRESS as string,
      JSON.parse(registryContractAbi.result)
    );
    registryContract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 3000000,
    }));
    const client = new NFTStorage({
      token: process.env.NFT_STORAGE_API_KEY as string,
    });
    const imageFile = new File(
      [Buffer.from(getSvg(repositoryName), "base64")],
      `${repositoryName}_${repositoryOwner}.svg`,
      {type: "image/svg+xml"}
    );
    const metadataCid = await client.store({
      name: repositoryName,
      description: `Soulbound Proof of Github Membership (POGM) for ${repositoryName} GitHub repository.\n\n${repo.html_url}`,
      image: imageFile,
      attributes: {
        Name: repositoryName,
        Url: repo.html_url,
      },
    });
    const originalUserAddress = ethers.utils.getAddress(user.address);
    const repoStruct = {
      githubRepoId: repositoryId,
      operators: [
        originalUserAddress,
        originalUserAddress,
        originalUserAddress,
      ],
      op: [0, 1, 2],
      blacklistedAddresses: blacklistedAddresses.map((a) =>
        ethers.utils.getAddress(a.trim())
      ),
      collections: requirements.map((requirement) =>
        requirement.type === TokenType.ERC20
          ? "0x0000000000000000000000000000000000000000"
          : ethers.utils.getAddress(requirement.address)
      ),
      ids: requirements.map((requirement) =>
        requirement.type === TokenType.ERC20
          ? ethers.BigNumber.from(requirement.address)
          : requirement.ids
      ),
      amounts: requirements.map((requirement) =>
        requirement.type === TokenType.ERC721
          ? 1
          : requirement.type === TokenType.ERC1155
          ? requirement.amount
          : ethers.utils.parseUnits(requirement.amount.toString(), 18)
      ),
      soulBoundTokenContract: "0x0000000000000000000000000000000000000000",
      tokenizedRepoName: repositoryName,
      soulboundBaseURI: metadataCid.url,
    };
    try {
      await registryContract.call(
        "createTokenizedRepo",
        repoStruct,
        messageHash,
        signedMessage
      );
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        "There was an error deploying the repository registry contract"
      );
    }

    const POGMFactoryContract = await sdk.getContract(
      process.env.POGM_CONTRACT_ADDRESS as string,
      soulboundFactoryContractAbi
    );
    POGMFactoryContract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 3000000,
    }));
    console.log("Contract ready! Now calling factory method...");
    try {
      const address = await POGMFactoryContract.call(
        "createPOGMToken",
        repo.id
      );
      console.log("Soulbound NFT Contract created");
      const soulboundCreatedLog = address.receipt.logs.filter(
        (log: {topics: string | string[]}) =>
          log.topics.includes(
            "0x23847815b902fbcb47b7d2eb0ca3429eac0c5d38155efaa188a5a36c5f9e802d"
          )
      );
      const abi = [
        "event SoulboundCreated(uint256 repoId, address soulboundContract)",
      ];
      const iface = new ethers.utils.Interface(abi);
      const p = iface.parseLog(soulboundCreatedLog[0]);
      const soulboundContractAddress = p.args.soulboundContract;
      return await RepositoryModel.create({
        name: repo.name,
        description: repo.description,
        githubUrl: repo.url,
        githubId: repo.id,
        githubOwner: repositoryOwner,
        ownerAddress: user.address,
        memberAddresses: [],
        requirements: requirements.map((r) => ({
          ...r,
          address: r.address.toLowerCase(),
        })),
        blacklistedAddresses: blacklistedAddresses.map((a) => a.toLowerCase()),
        metadataIpfsHash: metadataCid.ipnft,
        soulboundNFTContractAddress: soulboundContractAddress,
      });
    } catch (e) {
      console.error(e);
      throw new Error("Error while calling POGM SoulboundNFT Contract Factory");
    }
  }

  @Get()
  public async getList(
    @Req() req: NextApiRequest,
    @Query("walletAddress") walletAddress: string,
    @Query("page") page: number,
    @Query("limit") limit: number
  ) {
    const findObj: any = {};
    if (walletAddress) {
      findObj["$or"] = [
        {memberAddresses: walletAddress.toLowerCase()},
        {ownerAddress: walletAddress.toLowerCase()},
      ];
    }
    const skip = (page || 0) * (limit || 10);
    return RepositoryModel.find(
      findObj,
      {},
      {skip, limit: limit ? parseInt(String(limit), 10) : 10}
    );
  }
}

export default createHandler(CreateTokenizedRepositoryHandler);
