import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to db");
  } catch (err) {
    console.log(`error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
