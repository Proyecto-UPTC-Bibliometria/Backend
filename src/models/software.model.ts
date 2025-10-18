import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { SoftwareDocument } from "../interfaces/software.interface";
import ModelDocument from "../interfaces/auxiliars/ModelDocument.interface";

const softwareSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: false },
    year: { type: String, required: true },
    tradeName: { type: String, required: false },
    projectName: { type: String, required: false },
    fundingInstitution: { type: String, required: false },
    authors: { type: [String], required: true },
    group: { type: String, ref: "Group", required: true },
  },
  { timestamps: false, versionKey: false }
);

softwareSchema.plugin(mongoosePaginate);

export default mongoose.model<
  SoftwareDocument,
  ModelDocument<SoftwareDocument>
>("Software", softwareSchema);
