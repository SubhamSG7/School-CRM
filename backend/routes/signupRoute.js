import { Router } from "express";
import { Student, Teacher } from "../models/userSchema.js";
import teacherAssigned from "../helper/teacherRef.js";
import assignedClass from "../helper/classRef.js";
const router = Router();

router.post("/", async (req, res) => {
  const userInfo = req.body;
  const { role } = userInfo;

  try {
    let newUser;
    if (role === "Student") {
      newUser = new Student(userInfo);
      await newUser.save();
      teacherAssigned(newUser._id);
    } else if (role === "Teacher") {
      newUser = new Teacher(userInfo);
      await newUser.save();
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export default router;
