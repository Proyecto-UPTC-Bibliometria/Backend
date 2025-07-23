import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  formationDate: { type: Date, required: true },
  location: {
    department: { type: String, required: true },
    city: { type: String, required: true },
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  isCertified: { type: Boolean, default: false },
  website: { type: String, required: false },
  url: { type: String, required: true },
  email: { type: String, required: true },
  ranking: { type: String, required: true },
  knowledgeArea: { type: String, required: true },
  mainScienceProgram: { type: String, required: true },
  secondaryScienceProgram: { type: String, required: true },
  strategicPlan: { type: String, required: true },
  investigationLines: { type: [String], required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Group", groupSchema);
