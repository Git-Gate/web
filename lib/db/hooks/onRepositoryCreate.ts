import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {Repository} from "../interfaces/repository";
import {RepositoryModel} from "../models/repository";

export const onRepositoryCreate = async (data: any) => {
  const repository: Repository = data.fullDocument;
  if (!repository) {
    throw new Error("Error in onRepositoryCreate");
  }
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.GIT_GATE_WALLET_PVT_KEY as string,
    "mumbai"
  );
  const POGMFactoryContract = await sdk.getContract(
    process.env.POGM_CONTRACT_ADDRESS as string
  );
  const address = await POGMFactoryContract.call("createPOGMToken", [
    repository.githubId,
  ]);
  await RepositoryModel.updateOne(
    {_id: repository._id},
    {$set: {contractAddress: address}}
  );
};
