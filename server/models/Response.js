import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export const Response = mongoose.model("Response", responseSchema);
