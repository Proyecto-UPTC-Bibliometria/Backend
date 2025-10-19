import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { findAllBooks, findBookById } from "../services/book.service.js";

export async function getAllBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, validated, title, country, from, to, isbn, publisher } =
      req.query;
    const pageNumber = parseInt(page as string) || 1;

    const filters = {
      isValidated: validated as any,
      title: title as string,
      country: country as string,
      yearFrom: parseInt(from as string),
      yearTo: parseInt(to as string),
      isbn: isbn as string,
      publisher: publisher as string,
    };

    const books = await findAllBooks(pageNumber, filters);

    if (!books || books.length === 0) throw new NotFoundError("No books found");

    res.status(200).json(books);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const book = await findBookById(parseInt(id));

    if (!book) throw new NotFoundError("No book found");

    res.status(200).json(book);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
