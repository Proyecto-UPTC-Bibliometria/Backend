import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import {
  findAllArticles,
  findArticleById,
} from "../services/articles.service.js";

export async function getAllArticles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const articles = await findAllArticles();

    if (!articles || articles.length === 0)
      throw new NotFoundError("No articles found");

    res.status(200).json(articles);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getArticleById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const article = await findArticleById(parseInt(id));

    if (!article) throw new NotFoundError("No article found");

    res.status(200).json(article);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
