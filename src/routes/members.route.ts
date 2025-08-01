import express, { Router } from "express";
import {
  getAllMembers,
  getMemberById,
} from "../controllers/members.controller.js";

const router: Router = express.Router();

router.get("/members", getAllMembers);
router.get("/members/:id", getMemberById);

export default router;
