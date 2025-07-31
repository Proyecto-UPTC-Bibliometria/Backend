import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    group: {
      type: String,
      ref: "Group",
      required: true,
    },
    state: { type: String, required: true },
    dedicatedHours: { type: Number, required: true },
    cvUrl: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Member", memberSchema);
