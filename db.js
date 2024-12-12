import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_CONN_URI;
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error on connecting Database : ", error);
    process.exit(1);
  }
};
