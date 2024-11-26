import express from "express";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";
import mongoConnect from "./connection/mongoConnect.js";
import addclass from "./routes/classRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
mongoConnect();
app.use("/api/signup", signupRoute);
app.use("/api/addclass", addclass);
app.get("/", (req, res) => {
  res.send("Hello,Welcome To School ORM Application");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
