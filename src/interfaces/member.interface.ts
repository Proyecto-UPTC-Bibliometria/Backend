import mongoose from "mongoose";

export default interface Member {
  _id?: mongoose.Types.ObjectId;
  name: string;
  group?: string | mongoose.Types.ObjectId;
  state: string;
  dedicatedHours: number;
  cvUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
