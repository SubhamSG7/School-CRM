import { Router } from "express";
import { decodeAuthToken } from "../controllers/jwttoken.js";
import { Student, Teacher } from "../models/userSchema.js";
import Class from "../models/ClassSchema.js";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(400).json({ message: "Token Not Found" });
  }

  const userDetails = decodeAuthToken(token);

  try {
    const student = await Student.findById(userDetails._id).select("class");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classDetails = await Class.findOne({
      name: student.class.toString(),
    }).select("teachers");
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    const teacherDetails = await Promise.all(
      classDetails.teachers.map(async (teacherId) => {
        return await Teacher.findById(teacherId).select(
          "name email subject mobile dob gender"
        );
      })
    );
    res.status(200).json({ teachers: teacherDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
