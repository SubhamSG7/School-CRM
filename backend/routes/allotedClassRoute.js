import { Router } from "express";
import { decodeAuthToken } from "../controllers/jwttoken.js";
import { Teacher } from "../models/userSchema.js";
import Class from "../models/ClassSchema.js";

const router = Router();
router.get("/allotedclass", async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) res.status(400).json({ message: "Invalid Token" });
  const userDetails = decodeAuthToken(token);
  try {
    const allotedClasses = await Teacher.findById(userDetails._id).select(
      "class"
    );
    const classDetails = await Promise.all(
      allotedClasses?.class?.map(async (val) => {
        return await Class.aggregate([
          {
            $match: { name: val.toString() },
          },
          {
            $project: {
              id: 1,
              name: 1,
              studentCount: { $size: "$students" },
            },
          },
        ]);
      })
    );
    if (classDetails) res.status(200).json({ data: classDetails[0] });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
export default router;
