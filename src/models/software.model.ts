import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: String, required: true },
    tradeName: { type: String, required: true },
    projectName: { type: String, required: true },
    fundingInstitution: { type: String, required: true },
    authors: { type: [String], required: true },
    group: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Software", softwareSchema);
