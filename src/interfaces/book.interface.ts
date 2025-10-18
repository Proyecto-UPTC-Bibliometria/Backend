import mongoose from "mongoose";

export default interface Book {
  _id?: mongoose.Types.ObjectId;
  id: number;
  isValidated: boolean;
  title: string;
  country: string;
  year: number;
  isbn: string;
  publisher: string;
  authors: string[];
  group: string;
}

export interface BookDocument extends Book, Document {}
