import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ["Likert", "Open", "MultipleChoice"] },
  options: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

export const Question = mongoose.model("Question", questionSchema);
