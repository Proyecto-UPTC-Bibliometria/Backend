import mongoose from "mongoose";

export default interface Member {
  _id?: mongoose.Types.ObjectId;
  name: string;
  state: string;
  dedicatedHours: number;
  createdAt?: Date;
  updatedAt?: Date;
}
