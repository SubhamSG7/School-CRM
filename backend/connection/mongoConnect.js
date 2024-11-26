import mongoose from "mongoose";
import "dotenv/config";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default mongoConnect;
