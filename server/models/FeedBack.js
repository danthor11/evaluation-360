import { model, Schema } from "mongoose";
import { Employee } from "./Employee.js";
import { Evaluation } from "./Evaluation.js";

const FeedBackSchema = new Schema({
  date: { type: Date, required: true },
  comment: { type: Number, required: true },
  author: Employee,
  evaluation: Evaluation,
});

export const FeedBack = model("FeedBack", FeedBackSchema);
