import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connect has been started");
  } catch (error) {
    console.error("db error...");
    process.exit(1);
  }
};
