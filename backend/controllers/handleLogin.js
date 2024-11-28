import { User } from "../models/userSchema.js";
import { generateToken } from "./jwttoken.js";
import "dotenv/config";
async function handleLogin(req, res) {
  const incomingCredentials = req.body;
  if (
    !incomingCredentials?.email ||
    !incomingCredentials?.password ||
    !incomingCredentials?.role
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let userDetails;
    if (incomingCredentials.role !== "Class") {
      userDetails = await User.findOne({
        email: incomingCredentials.email,
      });
      if (!userDetails) {
        return res.status(404).json({ message: "User not found" });
      }
      if (userDetails.role !== incomingCredentials.role) {
        return res.status(403).json({ message: "Invalid role for the user" });
      }
      const isPasswordMatch = await userDetails.comparePassword(
        incomingCredentials.password
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      if (
        incomingCredentials.email === process.env.classEmail &&
        incomingCredentials.password === process.env.classPassword
      ) {
        userDetails = {
          _id: "789563",
          email: incomingCredentials.email,
          role: incomingCredentials.role,
        };
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    }
    const getToken = generateToken({
      _id: userDetails._id,
      email: userDetails.email,
      role: userDetails.role,
    });
    res.cookie("authToken", getToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export default handleLogin;
