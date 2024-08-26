import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";
const app = express();

app.use(cors());

connectDB().then(() => {
  console.log("DB CONNECTED!");
});

app.get("/test", async (req, res) => {
  const user = await User.create({
    email: "sad",
    password: "sad2",
    role: "Admin",
    username: "dsa",
  });

  return res.json(user);
});

app.listen(SERVER_PORT, () => {
  console.log("server running on port", SERVER_PORT);
});
