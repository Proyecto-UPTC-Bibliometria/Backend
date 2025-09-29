import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    cvUrl: { type: String, required: true },
    groups: [
      new mongoose.Schema(
        {
          groupId: {
            type: String,
            ref: "Group",
            required: true,
          },
          dedicatedHours: { type: Number, required: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Member", memberSchema);
