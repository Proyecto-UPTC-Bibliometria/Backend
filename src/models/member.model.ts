import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    state: { type: String, required: true },
    dedicatedHours: { type: Number, required: true },
    cvUrl: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Member", memberSchema);
