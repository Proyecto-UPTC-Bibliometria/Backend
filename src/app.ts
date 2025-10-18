import express from "express";
import cors from "cors";
import logger from "morgan";
import groupsRouter from "./routes/groups.route.js";
import membersRouter from "./routes/members.route.js";
import articlesRouter from "./routes/articles.route.js";
import booksRouter from "./routes/books.route.js";
import softwaresRouter from "./routes/softwares.route.js";
import projectsRouter from "./routes/projects.route.js";
import { compress } from "./middlewares/compression.middleware.js";

const app = express();
const route = "/api";

app.use([cors({ origin: "*" }), logger("dev"), express.json(), compress]);

app.use(route, groupsRouter);
app.use(route, membersRouter);
app.use(route, articlesRouter);
app.use(route, booksRouter);
app.use(route, softwaresRouter);
app.use(route, projectsRouter);

export default app;
