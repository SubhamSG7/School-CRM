import { Router } from "express";
import authHandler from "../controllers/authHandler.js";

const router = Router();

router.post("/", authHandler);

export default router;
