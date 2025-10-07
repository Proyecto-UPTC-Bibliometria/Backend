import mongoose from "mongoose";

export default interface Software {
  _id?: mongoose.Types.ObjectId;
  id: number;
  isValidated: boolean;
  type: string;
  name: string;
  country: string;
  year: number;
  tradeName: string;
  projectName: string;
  fundingInstitution: string;
  authors: string[];
  group: string;
}
