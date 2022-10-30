import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {Repository} from "../interfaces/repository";
import {RepositoryModel} from "../models/repository";
import {soulboundContractAbi} from "../../smart-contract-abis";
import {InternalServerErrorException} from "next-api-decorators";
import {UserModel} from "../models/user";

export const onRepositoryUpdate = async (data: any) => {
  console.log("[onRepositoryCreate] Start");
  const repository: Repository = data.fullDocument;
  if (!repository) {
    throw new Error("Error in onRepositoryCreate");
  }
  if (repository.soulboundNFTContractAddress) {
    console.log("[onRepositoryCreate] Initializing Thirdweb SDK");
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
    console.log("[onRepositoryCreate] Contract ready! Now minting...");
    const user = await UserModel.findOne({address: repository.ownerAddress});

    try {
      await repoSoulboundNFTContract.call("safeMint", user.address);
    } catch (e) {
      throw new InternalServerErrorException(
        "There was an error while minting your soulbound membership NFT. Please check that you fulfill the token requirements specified by the repo owner."
      );
    } finally {
      console.log("[onRepositoryCreate] Minted successfully!");
      await RepositoryModel.updateOne(
        {_id: repository._id},
        {memberAddresses: repository.memberAddresses.concat([user.address])}
      );
    }
  }
};
