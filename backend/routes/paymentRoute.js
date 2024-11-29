import { Router } from "express";
import { decodeAuthToken } from "../controllers/jwttoken.js";
import { Teacher } from "../models/userSchema.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const userDetails = decodeAuthToken(token);

  try {
    if (userDetails && userDetails.role === "Teacher") {
      const teacherSalary = await Teacher.findById(userDetails._id).select(
        "salary"
      );

      if (teacherSalary) {
        res.status(200).json({ salary: teacherSalary.salary });
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } else if (userDetails && userDetails.role === "Student") {
      res.status(200).json({ fee: 200000 });
    } else {
      res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
