import { Router } from "express";
import { Student, Teacher } from "../models/userSchema.js";
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
      assignedClass(newUser._id, role);
    } else if (role === "Teacher") {
      newUser = new Teacher(userInfo);
      await newUser.save();
      assignedClass(newUser._id, role);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res
      .status(201)
      .json({ message: `${newUser.name} Welcome To School ORM` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export default router;
