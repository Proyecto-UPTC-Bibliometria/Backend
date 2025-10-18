import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { MemberDocument } from "../interfaces/member.interface";
import ModelDocument from "../interfaces/auxiliars/ModelDocument.interface";

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

memberSchema.plugin(mongoosePaginate);

export default mongoose.model<MemberDocument, ModelDocument<MemberDocument>>(
  "Member",
  memberSchema
);
