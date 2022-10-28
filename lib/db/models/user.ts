import {Document, model, Schema} from 'mongoose'
import {User} from "../interfaces/user";

const userSchema = new Schema({
    _id: String,
    address: String,
    ensLabel: String,
    avatarUrl: String,
    githubUsername: String,
    githubToken: String,
    bio: String
}, { collection: 'users' })

export const UserModel = model<User & Document>('User', userSchema);