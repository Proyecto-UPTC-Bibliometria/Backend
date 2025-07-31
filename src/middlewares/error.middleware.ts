import { NextFunction, Request, Response } from "express";
import HttpError from "../interfaces/error/error.interface";
import { BaseHttpError } from "../utils/errors/custom.error";

export default function errorMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err) next();

  if (err instanceof BaseHttpError) {
    const { message, name, status } = err;

    res.status(status).json({ name, message });
  }

  res.status(500).json({
    name: "Internal Server Error",
    message: "Something went wrong!",
  });
}
