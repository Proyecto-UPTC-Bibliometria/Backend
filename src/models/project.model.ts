import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    group: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Project", projectSchema);
