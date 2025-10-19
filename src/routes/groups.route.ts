import express, { Router } from "express";
import {
  getAllGroups,
  getAllGroupsLight,
  getGroupById,
} from "../controllers/groups.controller.js";

const router: Router = express.Router();

router.get("/groups", getAllGroups);
router.get("/groups/:id", getGroupById);
router.get("/light/groups/", getAllGroupsLight);

export default router;
