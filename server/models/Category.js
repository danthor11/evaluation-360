const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

export const Category = mongoose.model("Category", categorySchema);
