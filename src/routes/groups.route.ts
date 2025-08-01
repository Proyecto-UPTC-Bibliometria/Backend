import express, { Router } from "express";
import {
  getAllGroups,
  getGroupById,
} from "../controllers/groups.controller.js";

const router: Router = express.Router();

router.get("/groups", getAllGroups);
router.get("/groups/:id", getGroupById);

export default router;
