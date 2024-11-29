import { Router } from "express";
import { decodeAuthToken } from "../controllers/jwttoken.js";
import Class from "../models/ClassSchema.js";
import { Student, Teacher } from "../models/userSchema.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.authToken;
  const { className, page } = req.body;
  const limit = 5; // You can make this configurable
  const skip = (page - 1) * limit;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const userDetails = decodeAuthToken(token);
  if (!userDetails) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }

  try {
    const classData = await Class.findOne({
      name: className.toString(),
    }).select({
      students: { $slice: [skip, limit] },
    });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const { yearFee } = classData;

    const studentDetails = await Student.find({
      _id: { $in: classData.students },
    }).select("name email dob gender mobile");

    const teacherDetails = await Teacher.find({
      _id: { $in: classData.teachers },
    }).select("name email subject gender mobile");

    const data = { classFee: yearFee, studentDetails, teacherDetails };

    res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.error("Error fetching class data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
