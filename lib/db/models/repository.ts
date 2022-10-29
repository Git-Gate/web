import mongoose, {Document, model, Schema} from "mongoose";
import {Repository} from "../interfaces/repository";

const RepositorySchema = new Schema(
  {
    name: String,
    description: String,
    githubUrl: String,
    githubId: String,
    githubOwner: String,
    ownerAddress: String,
    memberAddresses: [String],
    requirements: Schema.Types.Array,
    blacklistedAddresses: [String],
    contractAddress: String,
    imageIpfsHash: String,
  },
  {collection: "repositories"}
);

export const RepositoryModel =
  mongoose.models["Repository"] ||
  model<Repository & Document>("Repository", RepositorySchema);
