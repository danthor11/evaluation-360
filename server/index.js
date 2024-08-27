import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";
import { userRouter } from "./routes/user.js";
import { verifyAuthentication } from "./routes/middleware.js";
const app = express();

app.use(express.json());
app.use(cors());

connectDB().then(() => {
  console.log("DB CONNECTED!");
});

app.use(userRouter);

app.get("/test", verifyAuthentication, async (req, res) => {
  return res.json({});
});

app.listen(SERVER_PORT, () => {
  console.log("server running on port", SERVER_PORT);
});
