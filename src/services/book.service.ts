import bookModel from "../models/book.model.js";

export async function findAllBooks() {
  const foundBooks = await bookModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  return foundBooks;
}

export async function findBookById(id: number) {
  const foundBook = await bookModel.findOne({ id }).select("-_id").lean();

  return foundBook;
}
