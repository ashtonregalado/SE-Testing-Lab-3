import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI_DEV;

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URI:", MONGO_URI);

if (!MONGO_URI) {
  throw new Error("MongoDB URI is undefined! Check your .env file.");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${MONGO_URI}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
