import Class from "../models/ClassSchema.js";
import { Student } from "../models/userSchema.js";
import { decodeAuthToken } from "./jwttoken.js";

export async function classDetails(className, token, page) {
  try {
    const userData = decodeAuthToken(token);
    const limit = 5;
    const skip = (page - 1) * limit;
    let classToget = className;
    if (
      !userData ||
      (userData.role !== "Student" && userData.role !== "Teacher")
    ) {
      throw new Error("Unauthorized or invalid token");
    }
    if (userData.role === "Student") {
      const studentData = await Student.findById(userData._id).select("class");
      if (!studentData || !studentData.class) {
        throw new Error("Student data not found or no associated class");
      }
      classToget = studentData.class;
    }
    const classData = await Class.findOne({ name: classToget }).select({
      students: { $slice: [skip, limit] },
    });
    const studentDetails = await Student.find({
      _id: { $in: classData.students },
    }).select("name email dob gender mobile");

    return studentDetails;
  } catch (error) {
    console.error("Error fetching class details:", error.message);
    throw new Error("Error fetching class details");
  }
}
