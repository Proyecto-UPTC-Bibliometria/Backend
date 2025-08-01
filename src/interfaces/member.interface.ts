import mongoose from "mongoose";

export default interface Member {
  _id?: mongoose.Types.ObjectId;
  id: number;
  name: string;
  group: string;
  groupId: string;
  state: string;
  dedicatedHours: number;
  cvUrl?: string;
}
