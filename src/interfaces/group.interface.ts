import mongoose from "mongoose";

export default interface Group {
  _id?: mongoose.Types.ObjectId;
  name: string;
  formationDate: Date;
  location: {
    department: string;
    city: string;
  };
  leader: mongoose.Types.ObjectId;
  isCertified: boolean;
  website?: string;
  url: string;
  email: string;
  ranking: string;
  knowledgeArea: string;
  mainScienceProgram: string;
  secondaryScienceProgram: string;
  strategicPlan: string;
  investigationLines: string[];
  members: mongoose.Types.ObjectId[] | null;
  publications: mongoose.Types.ObjectId[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}
