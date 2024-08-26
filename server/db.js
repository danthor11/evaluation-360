import mongoose from "mongoose";
import { DATABASE_URI } from "./config.js";

export async function connectDB() {
  try {
    const db = await mongoose.connect(DATABASE_URI, {
      dbName: "evaluations-360",
    });
    console.log("Database is connected to ", db.connection.db.databaseName);
  } catch (error) {
    console.error(error);
  }
}
