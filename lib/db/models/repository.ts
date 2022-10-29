import mongoose, {Document, model, Schema} from "mongoose";
import {Repository} from "../interfaces/repository";

const RepositorySchema = new Schema(
  {
    name: String,
    githubId: String,
    githubUrl: String,
    description: String,
    ownerAddress: String,
    memberAddresses: [String],
    requirements: {
      type: [{type: String, address: String, amount: Number, ids: [Number]}],
    },
    blacklistedAddresses: [String],
    contractAddress: String,
    imageIpfsHash: String,
  },
  {collection: "repositories"}
);

export const RepositoryModel =
  mongoose.models["Repository"] ||
  model<Repository & Document>("Repository", RepositorySchema);
