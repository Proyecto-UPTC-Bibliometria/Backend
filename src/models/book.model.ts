import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    title: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    authors: { type: [String], required: true },
    group: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Book", bookSchema);
