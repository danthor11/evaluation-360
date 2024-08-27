import { model, Schema } from "mongoose";
import { Employee } from "./Employee.js";
import { Evaluation } from "./Evaluation.js";

const FeedBackSchema = new Schema({
  date: { type: Date, default: Date.now() },
  comment: { type: String, required: true },
  author: Employee,
  evaluation: Evaluation,
});

export const FeedBack = model("FeedBack", FeedBackSchema);
