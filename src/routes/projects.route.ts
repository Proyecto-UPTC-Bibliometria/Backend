import express, { Router } from "express";
import {
  getAllProjects,
  getProjectById,
} from "../controllers/projects.controller.js";

const router: Router = express.Router();

router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);

export default router;
