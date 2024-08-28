import express from "express";
import { FeedBack } from "../models/FeedBack.js";

export const fbRouter = express.Router();

fbRouter.post("/api/feedback", async (req, res) => {
  const { comment, author, evaluation } = req.body;
  try {
    const feedback = await FeedBack.create({
      date: Date.now(),
      author,
      comment,
      evaluation,
    });
    return res.json(feedback);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

fbRouter.get("/api/reports/:employee/:id", async (req, res) => {
  try {
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});
