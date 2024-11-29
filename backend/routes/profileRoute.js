import { Router } from "express";
import { decodeAuthToken } from "../controllers/jwttoken.js";
import { Student, Teacher } from "../models/userSchema.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.authToken;
  const userDetails = decodeAuthToken(token);
  if (userDetails.role === "Class") {
    return res.status(200).json({
      data: {
        email: userDetails.email,
        name: "Subham",
        role: userDetails.role,
        gender: "male",
        mobile: "7407901763",
      },
    });
  }
  let profileDetails;
  try {
    if (userDetails.role === "Student") {
      profileDetails = await Student.findById(userDetails._id).select(
        "name email gender mobile role"
      );
    }
    if (userDetails.role === "Teacher") {
      profileDetails = await Teacher.findById(userDetails._id).select(
        "name email gender mobile role"
      );
    }
    if (profileDetails) {
      return res.status(200).json({ data: profileDetails });
    }
    return res.status(404).json({ message: "Profile not found." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
