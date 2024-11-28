import { decodeAuthToken } from "./jwttoken.js";

async function authHandler(req, res) {
  try {
    const { path, role } = req.body;
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = decodeAuthToken(token);
    if (!decoded || decoded.role !== role) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (rolebasedAccess(path, role)) {
      return res.status(200).json({ message: "Access granted" });
    }

    return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function rolebasedAccess(path, role) {
  const accessPaths = {
    Student: [
      "/class",
      "/subjects",
      "/teachers",
      "/feestructure",
      "/profile",
      "/landingpage",
    ],
    Teacher: ["/class", "/salary", "/profile", "/landingpage"],
    Class: [
      "/classanalytics",
      "/assignteachers",
      "/incomeanalytics",
      "/profile",
      "/landingpage",
    ],
  };
  return accessPaths[role]?.includes(path) || false;
}

export default authHandler;
