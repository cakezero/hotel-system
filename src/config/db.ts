import mongoose from "mongoose";

const DB_URI: string = process.env.DB_URI;

mongoose.set("strictQuery", false);
export default async function connectDb() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to the DB!');
  } catch (err) {
    throw new Error('Error connecting to the DB!')
  }
}
