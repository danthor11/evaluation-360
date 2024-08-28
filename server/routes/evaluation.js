import express from "express";
import { Evaluation } from "../models/Evaluation.js";
import { Question } from "../models/Questions.js";
import { Category } from "../models/Category.js";
import { Response } from "../models/Response.js";
import { FeedBack } from "../models/FeedBack.js";
import { verifyAuthentication } from "./middleware.js";
import { User } from "../models/User.js";
import { Employee } from "../models/Employee.js";
export const evaluationRouter = express.Router();

//Asignacion y creacion de evaluacion
evaluationRouter.post("/api/evaluations", async (req, res) => {
  const { category, evaluationDate, employeeEvaluate, evaluators, questions } =
    req.body;
  const newQuestions = questions.filter((q) => q.name);

  try {
    const questionsCreated = await Question.insertMany(
      newQuestions.map((q) => ({
        text: q.name,
        type: q.type,
        options: q.options || [],
      }))
    );

    const categoryCreated = await Category.create({
      name: category.name,
      description: category.description,
      questions: questionsCreated,
    });

    const evaluation = await Evaluation.create({
      category: categoryCreated,
      date: evaluationDate,
      evaluators: evaluators.map((e) => ({
        evaluator: e.id,
        role: e.role,
      })),
      employee: employeeEvaluate,
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
      { responses: responsesCreated, status: "Completed" }
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

evaluationRouter.get("/api/evaluations", async (req, res) => {
  try {
    console.log("DDD");
    const evaluations = await Evaluation.find({})
      .populate({ path: "category" })
      .populate("employee");

    return res.json(evaluations);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

evaluationRouter.get(
  "/api/evaluations/manager",
  verifyAuthentication,
  async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username });
      const employee = await Employee.findOne({ user: user });
      const evaluations = await Evaluation.find({
        evaluators: {
          $elemMatch: { evaluator: employee._id },
        },
      })
        .populate("category")
        .populate("employee");

      return res.json(evaluations);
    } catch (error) {
      const message = error?.message
        ? error.message
        : "An error occurred on the server. Please try again later.";
      res.status(401);
      res.json({ message });
    }
  }
);

evaluationRouter.get("/api/evaluations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) throw Error("Id is required");
    const evaluation = await Evaluation.findById(id)
      .populate({ path: "category", populate: { path: "questions" } })
      .populate("employee");
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
    if (!id) throw Error("Id is required");
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
  console.log(id);
  try {
    if (!id) throw Error("Id is required");
    const evaluations = await Evaluation.find({ employee: id })
      .populate("category")
      .populate("employee");

    return res.json(evaluations);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

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
