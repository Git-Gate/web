import {Document, model, Schema} from 'mongoose'
import {Repository} from "../interfaces/repository";

const RepositorySchema = new Schema({
    name: String,
    githubId: String,
    description: String,
    userId: String,
    owner: String,
    requirements: {type: [{type: String, address: String, amount: Number, ids: [Number]}]},
    blacklistedAddresses: [String]
})

export const RepositoryModel = model<Repository & Document>('Repository', RepositorySchema);
