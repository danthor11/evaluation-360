import express from "express";
import { Evaluation } from "../models/Evaluation.js";
import { Question } from "../models/Questions.js";
import { Category } from "../models/Category.js";
import Response from "../models/Response.js";
import { FeedBack } from "../models/FeedBack.js";

export const evaluationRouter = express.Router();

//Asignacion y creacion de evaluacion
evaluationRouter.post("/api/evaluations", async (req, res) => {
  const { name, description, employee_id, evaluators, questions } = req.body;
  try {
    const questionsCreated = await Question.insertMany(
      questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options || [],
      }))
    );

    const category = await Category.create({
      name,
      description,
      questions: questionsCreated,
    });

    const evaluation = await Evaluation.create({
      category,
      date: new Date(),
      evaluators: evaluators.map((e) => ({
        evaluator: e.evaluator,
        role: e.role,
      })),
      employee: employee_id,
    });

    return res.status(201).json(evaluation);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

//Response evaluation
evaluationRouter.post("/api/evaluations/:id/response", async (req, res) => {
  const { responses } = req.body;
  const evaluation_id = req.params.id;
  try {
    const responsesCreated = await Response.insertMany(
      responses.map((r) => ({
        evaluation: evaluation_id,
        evaluator: r.evaluator,
        question: r.question,
        answer: r.answer,
      }))
    );

    // TODO:  ACTUALIZAR SCORE
    const evaluation = await Evaluation.findOneAndUpdate(
      { _id: evaluation_id },
      { responses: responsesCreated }
    );
    return res.status(201).json(evaluation);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

evaluationRouter.get("/api/evaluations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const evaluation = await Evaluation.findById(id);
    return res.json(evaluation);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

evaluationRouter.put("/api/evaluations/:id", async (req, res) => {
  try {
    //TODO
    const employees = await Employee.find({});
    return employees;
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

evaluationRouter.get("/api/evaluations/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const evaluations = await Evaluation.find({ employee: id });
    return res.json(evaluations);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

// comment: { type: Number, required: true },
// author: Employee,
// evaluation: Evaluation,
evaluationRouter.post("/api/feedback", async (req, res) => {
  const { evaluation_id, author, comment } = req.body;

  try {
    const feedback = await FeedBack.create({
      author,
      comment,
      date,
      evaluation: evaluation_id,
    });

    res.status(201).json(feedback);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});
