import mongoose, {Mongoose} from "mongoose";

export async function connect(): Promise<Mongoose> {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.lv8tmec.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`
  );
}
