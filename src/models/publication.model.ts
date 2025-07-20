import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  country: { type: String, required: true },
  year: { type: Number, required: true },
  volume: { type: String, required: true },
  issn: { type: String, required: true },
  pages: { type: String, required: true },
  doi: { type: String, required: true },
  authors: { type: [String], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Publication", publicationSchema);
