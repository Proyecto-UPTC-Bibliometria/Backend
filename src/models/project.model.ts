import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProjectDocument } from "../interfaces/project.interface";
import ModelDocument from "../interfaces/auxiliars/ModelDocument.interface";

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    status: { type: String, required: false },
    group: { type: String, ref: "Group", required: true },
  },
  { timestamps: false, versionKey: false }
);

projectSchema.plugin(mongoosePaginate);

export default mongoose.model<ProjectDocument, ModelDocument<ProjectDocument>>(
  "Project",
  projectSchema
);
