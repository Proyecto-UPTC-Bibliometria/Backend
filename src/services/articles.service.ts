import ArticleFilters from "../interfaces/filters/articleFilters.interface.js";
import articleModel from "../models/article.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import { ArticleDocument } from "../interfaces/article.interface.js";
import { buildQuery } from "../utils/queryBuilder.js";

const ARTICLE_FILTER_CONFIG = {
  isValidated: { type: "boolean" as const },
  title: { type: "regex" as const },
  country: { type: "exact" as const },
  journal: { type: "regex" as const },
  issn: { type: "exact" as const },
  volume: { type: "exact" as const },
  doi: { type: "regex" as const },
};

export async function findAllArticles(page: number, filters?: ArticleFilters) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<ArticleDocument>(
    filters || {},
    ARTICLE_FILTER_CONFIG
  );

  if (filters?.yearFrom || filters?.yearTo) {
    query.year = {};
    if (filters.yearFrom) query.year.$gte = filters.yearFrom;
    if (filters.yearTo) query.year.$lte = filters.yearTo;
  }

  const foundArticles = await articleModel.paginate(query, options);

  return foundArticles;
}

export async function findArticleById(id: number) {
  const foundArticle = await articleModel.findOne({ id }).select("-_id").lean();

  return foundArticle;
}
