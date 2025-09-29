import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    groupId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    formationDate: { type: Date, required: true },
    location: {
      department: { type: String, required: false },
      city: { type: String, required: false },
    },
    leader: {
      type: String,
      required: true,
    },
    isCertified: { type: Boolean, default: false },
    website: { type: String, required: false },
    url: { type: String, required: true },
    email: { type: String, required: true },
    ranking: { type: String, required: false },
    knowledgeArea: { type: String, required: true },
    mainScienceProgram: { type: String, required: true },
    secondaryScienceProgram: { type: String, required: true },
    strategicPlan: {
      plan: { type: String, required: false },
      stateOfArt: { type: String, required: false },
      objectives: { type: String, required: false },
      challenges: { type: String, required: false },
      vision: { type: String, required: false },
    },
    investigationLines: { type: [String], required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: false,
    versionKey: false,
  }
);

groupSchema.virtual("members", {
  ref: "Member",
  localField: "groupId",
  foreignField: "groups.groupId",
});

groupSchema.virtual("publications", {
  ref: "Publication",
  localField: "groupId",
  foreignField: "groupId",
});

export default mongoose.model("Group", groupSchema);
