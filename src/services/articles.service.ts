import articleModel from "../models/article.model.js";

export async function findAllArticles() {
  const foundArticles = await articleModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  return foundArticles;
}

export async function findArticleById(id: number) {
  const foundArticle = await articleModel.findOne({ id }).select("-_id").lean();

  return foundArticle;
}
