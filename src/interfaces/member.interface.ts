import mongoose from "mongoose";
import MemberGroups from "./auxiliars/memberGroups.interface";

export default interface Member {
  _id?: mongoose.Types.ObjectId;
  id: number;
  name: string;
  state: string;
  cvUrl?: string;
  groups: MemberGroups[];
}

export interface MemberDocument extends Member, Document {}
