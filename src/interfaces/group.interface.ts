import mongoose from "mongoose";
import StrategicPlan from "./auxiliars/strategicPlan.interface";

export default interface Group {
  _id?: mongoose.Types.ObjectId;
  id: number;
  groupId: string;
  name: string;
  formationDate: Date;
  groupLocation: {
    department: string;
    city: string;
  };
  leader: string;
  isCertified: boolean;
  website?: string;
  url: string;
  email: string;
  ranking: string;
  knowledgeArea: string;
  mainScienceProgram: string;
  secondaryScienceProgram: string;
  strategicPlan: StrategicPlan;
  investigationLines: string[];
}

export interface GroupDocument extends Group, Document {}
