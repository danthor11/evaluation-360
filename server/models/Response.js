const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);
