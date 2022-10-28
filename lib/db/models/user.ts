import {Document, model, Schema} from 'mongoose'
import {User} from "../interfaces/user";

const UserSchema = new Schema({
    _id: String,
    address: String,
    ensLabel: String,
    avatarUrl: String,
    githubUsername: String,
    githubToken: String,
    bio: String
})

export const UserModel = model<User & Document>('User', UserSchema);
