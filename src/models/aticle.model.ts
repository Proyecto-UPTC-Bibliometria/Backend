import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    title: { type: String, required: true },
    country: { type: String, required: true },
    journal: { type: String, required: true },
    issn: { type: String, required: true },
    year: { type: Number, required: true },
    volume: { type: String, required: true },
    issue: { type: String, required: true },
    pages: { type: String, required: true },
    doi: { type: String, required: true },
    authors: { type: [String], required: true },
    group: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Article", articleSchema);
