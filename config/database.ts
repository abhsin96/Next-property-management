import mongoose from "mongoose";

let connnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    connnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
};

export default connectDB;
