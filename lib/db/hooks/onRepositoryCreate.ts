import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {generateRepositoryNFTImage} from "../../handlebars";
import {Repository} from "../interfaces/repository";
import {initPinata, uploadToPinata} from "../../pinata";
import {Readable} from "stream";
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
  await POGMFactoryContract.call("createPOGMToken", [repository._id]);
  console.log(data);
};
