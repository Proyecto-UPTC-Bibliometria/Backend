import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import { findAllBooks, findBookById } from "../services/book.service.js";

export async function getAllBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const books = await findAllBooks(page);

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
