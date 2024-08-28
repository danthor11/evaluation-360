import { model, Schema } from "mongoose";

const EvaluationSchema = new Schema({
  date: { type: Date, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  score: { type: Number },
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  evaluators: [
    {
      evaluator: { type: Schema.Types.ObjectId, ref: "Employee" },
      role: {
        type: String,
        enum: ["Supervisor", "Self", "Colleague", "Subordinate"],
        required: true,
      },
    },
  ],
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],
});

export const Evaluation = model("Evaluation", EvaluationSchema);
