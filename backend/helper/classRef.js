import { Teacher, Student } from "../models/userSchema.js";
import Class from "../models/ClassSchema.js";

async function assignedClass(userId, role) {
  let userDetails;
  if (role === "Teacher") {
    try {
      userDetails = await Teacher.findById(userId).select("class");
      for (const className of userDetails.class) {
        const classDetails = await Class.findOne({ name: className });
        if (!classDetails.teachers.includes(userId)) {
          classDetails.teachers.push(userId);
          await classDetails.save();
        } else {
          console.log(`Class not found: ${className}`);
        }
      }
      console.log("Class updated successfully.");
    } catch (error) {
      console.log(error);
    }
  } else if (role === "Student") {
    try {
      userDetails = await Student.findById(userId).select("class");
      const classDetails = await Class.findOne({ name: userDetails.class });
      if (!classDetails.students.includes(userId)) {
        classDetails.students.push(userId);
        await classDetails.save();
        console.log("Class updated Sucessfully");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default assignedClass;
