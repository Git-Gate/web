import mongoose from "mongoose";
import {RepositoryModel} from "./models/repository";
import {repositoriesHook} from "./hooks/repositories";

export async function connect(): Promise<void> {
  if (mongoose?.connection?.db) {
    return;
  }
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.lv8tmec.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`
  );
  RepositoryModel.watch([]).on("change", repositoriesHook);
}
