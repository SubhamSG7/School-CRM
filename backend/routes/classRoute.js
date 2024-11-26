import { Router } from "express";
import Class from "../models/ClassSchema.js";

const router = Router();

router.post("/", async (req, res) => {
  let incomingData = req.body;
  if (Object.keys(incomingData).length > 0) {
    try {
      let newClass = new Class(incomingData);
      await newClass.save();
      res.status(201);
    } catch (error) {
      console.log(error);
    }
  }
});

export default router;
