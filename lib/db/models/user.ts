import mongoose, {Document, model, Schema} from "mongoose";
import {User} from "../interfaces/user";

const userSchema = new Schema(
  {
    address: String,
    ensLabel: String,
    avatarUrl: String,
    bio: String,
    githubName: String,
    githubLogin: String,
    githubToken: String,
  },
  {collection: "users"}
);
export const UserModel =
  mongoose.models["User"] || model<User & Document>("User", userSchema);
