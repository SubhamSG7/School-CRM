import { Router } from "express";
import { Student, Teacher } from "../models/userSchema.js";
import { decodeAuthToken } from "../controllers/jwttoken.js";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.cookies.authToken;
  const { type } = req.body;
  decodeAuthToken(token);
  let totalExpenditure;
  let totalIncomeFromFee;
  let fee = 200000; // Assuming fee per student
  const allStudentsCount = await Student.countDocuments();

  try {
    const totalSalaryResult = await Teacher.aggregate([
      {
        $addFields: {
          salary: { $toDouble: "$salary" },
        },
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
        },
      },
    ]);

    const totalSalary = totalSalaryResult[0]?.totalSalary || 0; // Get the total salary or default to 0 if no teachers

    if (type === "monthly") {
      totalExpenditure = totalSalary;
      totalIncomeFromFee = (allStudentsCount * fee) / 12; // Income per month
      return res.status(200).json({
        message: "success",
        data: { totalExpenditure, totalIncomeFromFee },
      });
    }

    if (type === "yearly") {
      totalExpenditure = totalSalary * 12; // Yearly expenditure
      totalIncomeFromFee = allStudentsCount * fee; // Income from fees for the year
      return res.status(200).json({
        message: "success",
        data: { totalExpenditure, totalIncomeFromFee },
      });
    }

    // If no valid type is provided, send an error
    return res.status(400).json({
      message: "Invalid type provided, must be 'monthly' or 'yearly'.",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message:
        "An error occurred while calculating the total income and expenditure.",
    });
  }
});

export default router;
