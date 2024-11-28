import { Router } from "express";
import { classDetails } from "../controllers/classDetails.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.authToken;
  const { className, page } = req.body;
  const getClassDetails = await classDetails(className, token, page);
  if (getClassDetails) {
    res.status(200).json({ data: getClassDetails });
  }
});

export default router;
