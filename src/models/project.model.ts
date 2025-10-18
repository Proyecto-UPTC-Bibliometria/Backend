import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    status: { type: String, required: false },
    group: { type: String, ref: "Group", required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Project", projectSchema);
