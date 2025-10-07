import mongoose from "mongoose";

export default interface Project {
  _id?: mongoose.Types.ObjectId;
  id: number;
  isValidated: boolean;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  group: string;
}
