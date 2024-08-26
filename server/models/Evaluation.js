import { model, Schema } from "mongoose";
import { Employee } from "./Employee.js";

const EvaluationSchema = new Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number, required: true },
  evaluator_role: {
    type: String,
    enum: ["Supervisor", "Self", "Colleague", "Subordinate"],
    required: true,
  },
  employee: Employee,
  evaluator: Employee,
});

export const Evaluation = model("Evaluation", EvaluationSchema);
