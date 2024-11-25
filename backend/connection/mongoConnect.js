import "dotenv/config";
import { MongoClient } from "mongodb";

const mongoURL = process.env.MONGOURL;
async function mongoConnect() {
  try {
    const client = new MongoClient(mongoURL);
    await client.connect();
    console.log("DB Connected SuccesFully");
  } catch (error) {
    console.log("Failed To connect DB", error);
  }
}
export default mongoConnect;
