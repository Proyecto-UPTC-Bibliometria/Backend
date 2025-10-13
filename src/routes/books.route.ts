import express, { Router } from "express";
import { getAllBooks, getBookById } from "../controllers/books.controller.js";

const router: Router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);

export default router;
