import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { BookDocument } from "../interfaces/book.interface";
import ModelDocument from "../interfaces/auxiliars/ModelDocument.interface";

const bookSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    isValidated: { type: Boolean, required: true },
    title: { type: String, required: true },
    country: { type: String, required: false },
    year: { type: Number, required: true },
    isbn: { type: String, required: false },
    publisher: { type: String, required: false },
    authors: { type: [String], required: true },
    group: { type: String, ref: "Group", required: true },
  },
  { timestamps: false, versionKey: false }
);

bookSchema.plugin(mongoosePaginate);

export default mongoose.model<BookDocument, ModelDocument<BookDocument>>(
  "Book",
  bookSchema
);
