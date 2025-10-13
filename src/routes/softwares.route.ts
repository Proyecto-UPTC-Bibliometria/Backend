import express, { Router } from "express";
import {
  getAllSoftwares,
  getSoftwareById,
} from "../controllers/softwares.controller.js";

const router: Router = express.Router();

router.get("/softwares", getAllSoftwares);
router.get("/softwares/:id", getSoftwareById);

export default router;
