import express from "express";
import cors from "cors";
import logger from "morgan";
import groupsRouter from "./routes/groups.route.js";
import membersRouter from "./routes/members.route.js";

const app = express();
const route = "/api";

app.use([cors({ origin: "*" }), logger("dev"), express.json()]);

app.use(route, groupsRouter);
app.use(route, membersRouter);

export default app;
