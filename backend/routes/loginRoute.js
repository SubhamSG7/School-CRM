import { Router } from "express";
import handleLogin from "../controllers/handleLogin.js";
const router = Router();

router.post("/", handleLogin);

export default router;
