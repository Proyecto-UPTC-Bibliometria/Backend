import articleModel from "../models/article.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllArticles(page: number) {
  const options = { ...paginateOptions, page };

  const foundArticles = await articleModel.paginate({}, options);

  return foundArticles;
}

export async function findArticleById(id: number) {
  const foundArticle = await articleModel.findOne({ id }).select("-_id").lean();

  return foundArticle;
}
