import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

groupSchema.virtual("members", {
  ref: "Member",
  localField: "_id",
  foreignField: "group",
});

groupSchema.virtual("publications", {
  ref: "Publication",
  localField: "_id",
  foreignField: "group",
});

export default mongoose.model("Group", groupSchema);
