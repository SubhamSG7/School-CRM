import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  try {
    if (req.cookies.authToken) {
      res.clearCookie("authToken");
    }
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
