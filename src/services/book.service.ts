import bookModel from "../models/book.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllBooks(page: number) {
  const options = { ...paginateOptions, page };

  const foundBooks = await bookModel.paginate({}, options);

  return foundBooks;
}

export async function findBookById(id: number) {
  const foundBook = await bookModel.findOne({ id }).select("-_id").lean();

  return foundBook;
}
