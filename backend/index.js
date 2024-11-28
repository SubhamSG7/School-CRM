import express from "express";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";
import mongoConnect from "./connection/mongoConnect.js";
import addclass from "./routes/classRoute.js";
import loginRoute from "./routes/loginRoute.js";
import authRoute from "./routes/authRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import classDataRoute from "./routes/classDataRoute.js";
import allotedClassRoute from "./routes/allotedClassRoute.js";
import getTeachersRoute from "./routes/getTeachersRoute.js";
import profileRoute from "./routes/profileRoute.js";

const app = express();
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
mongoConnect();
app.use("/api/signup", signupRoute);
app.use("/api/addclass", addclass);
app.use("/api/login", loginRoute);
app.use("/api/auth", authRoute);
app.use("/api/classdata", classDataRoute);
app.use("/api/teacher", allotedClassRoute);
app.use("/api/teachersdata", getTeachersRoute);
app.use("/api/profile", profileRoute);

app.get("/", (req, res) => {
  res.send("Hello,Welcome To School ORM Application");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
