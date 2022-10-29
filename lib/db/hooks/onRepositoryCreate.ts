import {ThirdwebSDK} from "@thirdweb-dev/sdk";
import {Repository} from "../interfaces/repository";
import {RepositoryModel} from "../models/repository";
import {soulboundFactoryContractAbi} from "../../smart-contract-abis";
import {ethers} from "ethers";

export const onRepositoryCreate = async (data: any) => {
  const repository: Repository = data.fullDocument;
  if (!repository) {
    throw new Error("Error in onRepositoryCreate");
  }
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.GIT_GATE_WALLET_PVT_KEY as string,
    "mumbai",
    {gasSettings: {speed: "fastest"}}
  );
  const POGMFactoryContract = await sdk.getContract(
    process.env.POGM_CONTRACT_ADDRESS as string,
    soulboundFactoryContractAbi
  );
  POGMFactoryContract.interceptor.overrideNextTransaction(() => ({
    gasLimit: 3000000,
  }));
  try {
    const address = await POGMFactoryContract.call(
      "createPOGMToken",
      repository.githubId
    );
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
    await RepositoryModel.updateOne(
      {_id: repository._id},
      {$set: {soulboundNFTContractAddress: soulboundContractAddress}}
    );
  } catch (e) {
    console.error(e);
    throw new Error("Error while calling POGM SoulboundNFT Contract Factory");
  }
};
