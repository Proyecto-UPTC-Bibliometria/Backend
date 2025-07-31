import express, { Router } from "express";
import { getAllMembers } from "../controllers/members.controller.js";

const router: Router = express.Router();

router.get("/members", getAllMembers);

export default router;
