import mongoose, { mongo } from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  dedicatedHours: { type: Number, required: true },
  cvUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Member", memberSchema);
