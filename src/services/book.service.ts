import { BookDocument } from "../interfaces/book.interface.js";
import BookFilters from "../interfaces/filters/bookFilters.interface.js";
import bookModel from "../models/book.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import { buildQuery } from "../utils/queryBuilder.js";

const BOOK_FILTER_CONFIG = {
  isValidated: { type: "boolean" as const },
  title: { type: "regex" as const },
  country: { type: "exact" as const },
  isbn: { type: "exact" as const },
  publisher: { type: "regex" as const },
};

export async function findAllBooks(page: number, filters?: BookFilters) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<BookDocument>(filters || {}, BOOK_FILTER_CONFIG);

  if (filters?.yearFrom || filters?.yearTo) {
    query.year = {};
    if (filters.yearFrom) query.year.$gte = filters.yearFrom;
    if (filters.yearTo) query.year.$lte = filters.yearTo;
  }

  const foundBooks = await bookModel.paginate(query, options);

  return foundBooks;
}

export async function findBookById(id: number) {
  const foundBook = await bookModel.findOne({ id }).select("-_id").lean();

  return foundBook;
}
