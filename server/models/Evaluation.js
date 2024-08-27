import { model, Schema } from "mongoose";
import { Employee } from "./Employee.js";

const EvaluationSchema = new Schema({
  date: { type: Date, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  score: { type: Number },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  evaluators: [
    {
      evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["Supervisor", "Self", "Colleague", "Subordinate"],
        required: true,
      },
    },
  ],
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
});

export const Evaluation = model("Evaluation", EvaluationSchema);
