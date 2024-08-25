import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
const app = express();

app.use(cors());

app.get("/test", (req, res) => {
  return res.json({ message: "ok" });
});

app.listen(SERVER_PORT, () => {
  console.log("server running on port", SERVER_PORT);
});
