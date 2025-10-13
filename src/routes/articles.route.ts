import express, { Router } from "express";
import {
  getAllArticles,
  getArticleById,
} from "../controllers/articles.controller.js";

const router: Router = express.Router();

router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);

export default router;
