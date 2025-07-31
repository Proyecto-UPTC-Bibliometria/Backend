import express, { Router } from "express";
import { getAllGroups } from "../controllers/groups.controller.js";

const router: Router = express.Router();

router.get("/groups", getAllGroups);

export default router;
