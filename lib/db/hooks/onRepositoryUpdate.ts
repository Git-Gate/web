import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {Repository} from "../interfaces/repository";
import {RepositoryModel} from "../models/repository";
import {soulboundContractAbi} from "../../smart-contract-abis";
import {InternalServerErrorException} from "next-api-decorators";
import {UserModel} from "../models/user";

export const onRepositoryUpdate = async (data: any) => {
  const repository: Repository = data.fullDocument;
  if (!repository) {
    throw new Error("Error in onRepositoryCreate");
  }
  if (repository.soulboundNFTContractAddress) {
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.GIT_GATE_WALLET_PVT_KEY as string,
      "mumbai",
      {gasSettings: {speed: "fastest"}}
    );
    const repoSoulboundNFTContract = await sdk.getContract(
      repository.soulboundNFTContractAddress,
      soulboundContractAbi
    );
    repoSoulboundNFTContract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 3000000,
    }));
    const repositoryPOGMContract = await sdk.getContract(
      repository.soulboundNFTContractAddress as string,
      soulboundContractAbi
    );

    repositoryPOGMContract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 3000000,
    }));

    const user = await UserModel.findOne({address: repository.ownerAddress});

    try {
      await repositoryPOGMContract.call("safeMint", user.address);
    } catch (e) {
      throw new InternalServerErrorException(
        "There was an error while minting your soulbound membership NFT. Please check that you fulfill the token requirements specified by the repo owner."
      );
    }
    await RepositoryModel.updateOne(
      {_id: repository._id},
      {memberAddresses: repository.memberAddresses.concat([user.address])}
    );
  }
};
