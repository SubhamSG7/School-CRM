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
import classAnalyticsRoute from "./routes/classAnalytics.js";
import incomeAnalytics from "./routes/incomeAnalytics.js";
import logoutRoute from "./routes/logoutRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
const app = express();
const port = process.env.port || 3000;
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://school-crm-5wdd.nine.app/loginp",
      "https://school-crm-5wdd.vercel.app/login", // Add the new frontend URL here
    ];

    // Check if the incoming origin is in the list of allowed origins
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
mongoConnect();
app.use("/api/getanalytics", incomeAnalytics);
app.use("/api/signup", signupRoute);
app.use("/api/paymentdetail", paymentRoute);
app.use("/api/addclass", addclass);
app.use("/api/login", loginRoute);
app.use("/api/auth", authRoute);
app.use("/api/classdata", classDataRoute);
app.use("/api/teacher", allotedClassRoute);
app.use("/api/teachersdata", getTeachersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/classanalytics", classAnalyticsRoute);
app.use("/api/logout", logoutRoute);

app.get("/", (req, res) => {
  res.send("Hello,Welcome To School ORM Application");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
