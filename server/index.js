import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
import { connectDB } from "./db.js";
import { userRouter } from "./routes/user.js";
import { verifyAuthentication } from "./routes/middleware.js";
import { employeeRoute } from "./routes/employee.js";
import { evaluationRouter } from "./routes/evaluation.js";
import { fbRouter } from "./routes/feedback.js";
const app = express();

app.use(express.json());
app.use(cors());

connectDB().then(() => {
  console.log("DB CONNECTED!");
});

app.use(fbRouter);
app.use(userRouter);
app.use(employeeRoute);
app.use(evaluationRouter);

app.get("/test", verifyAuthentication, async (req, res) => {
  return res.json({});
});

app.listen(SERVER_PORT, () => {
  console.log("server running on port", SERVER_PORT);
});
