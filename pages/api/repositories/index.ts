import {
  BadRequestException,
  Body,
  createHandler,
  Get,
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
import {Readable} from "stream";
import {connect} from "../../../lib/db";
import {TokenType} from "../../../lib/db/interfaces/repository";
import {RepositoryModel} from "../../../lib/db/models/repository";
import {JwtAuthGuard} from "../../../lib/middlewares";
import {User} from "../../../lib/db/interfaces/user";
import {GithubClient} from "../../../lib/github-client";
import {generateRepositoryNFTImage} from "../../../lib/handlebars";
import {initPinata, uploadToPinata} from "../../../lib/pinata";

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
    } = body;

    const existentRepository = await RepositoryModel.findOne({
      githubId: repositoryId,
    });

    if (existentRepository) {
      throw new BadRequestException("Repository already existed.");
    }

    const user = req.user as User;
    const githubClient = new GithubClient(user.githubToken as string);
    const repo = await githubClient.getRepository(
      repositoryOwner,
      repositoryName
    );
    const repoImageBuffer = await generateRepositoryNFTImage(repo.name);
    await initPinata(
      process.env.PINATA_API_KEY as string,
      process.env.PINATA_API_SECRET as string
    );
    const response = await uploadToPinata(Readable.from(repoImageBuffer));
    return await RepositoryModel.create({
      name: repo.name,
      description: repo.description,
      githubUrl: repo.url,
      githubId: repo.id,
      ownerAddress: user.address,
      memberAddresses: [user.address],
      requirements: requirements.map((r) => ({
        ...r,
        address: r.address.toLowerCase(),
      })),
      blacklistedAddresses: blacklistedAddresses.map((a) => a.toLowerCase()),
      imageIpfsHash: response.IpfsHash,
    });
  }

  @Get()
  public async getList(
    @Req() req: NextApiRequest,
    @Query("ownerAddress") ownerAddress: string,
    @Query("name") name: string,
    @Query("memberAddress") memberAddress: string,
    @Query("page") page: number,
    @Query("limit") limit: number
  ) {
    const findObj: any = {};
    if (ownerAddress) {
      findObj["ownerAddress"] = ownerAddress.toLowerCase();
    }
    if (memberAddress) {
      findObj["memberAddresses"] = memberAddress.toLowerCase();
    }
    if (name) {
      findObj["name"] = {
        $regex: name,
      };
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
