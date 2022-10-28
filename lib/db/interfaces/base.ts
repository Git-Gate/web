import {ObjectId} from "mongoose";

export interface Base {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
}
