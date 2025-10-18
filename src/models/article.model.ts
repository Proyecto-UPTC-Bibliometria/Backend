import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    title: { type: String, required: true },
    country: { type: String, required: false },
    journal: { type: String, required: false },
    issn: { type: String, required: false },
    year: { type: Number, required: true },
    volume: { type: String, required: false },
    issue: { type: String, required: false },
    pages: { type: String, required: false },
    doi: { type: String, required: false },
    authors: { type: [String], required: true },
    group: { type: String, ref: "Group", required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Article", articleSchema);
