import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    volume: { type: String, required: true },
    group: { type: String, required: true },
    groupId: {
      type: String,
      ref: "Group",
      required: true,
    },
    issn: { type: String, required: true },
    pages: { type: String, required: true },
    doi: { type: String, required: true },
    authors: { type: [String], required: true },
    content: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Publication", publicationSchema);
