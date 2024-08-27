import express from "express";
import { FeedBack } from "../models/FeedBack.js";

export const fbRouter = express.Router();

// ○ POST /api/feedback: Enviar feedback para una evaluación
// ○ GET /api/reports/employee/:id: Generar reporte de evaluación para un
// empleado

fbRouter.post("/api/feedback", async (req, res) => {
  const { date, comment, author, evaluation } = req.body;
  try {
    const feedback = await FeedBack.create({
      author,
      comment,
      date,
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
