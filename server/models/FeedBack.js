import { model, Schema } from "mongoose";

const FeedBackSchema = new Schema({
  date: { type: Date },
  comment: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Employee" },
  evaluation: { type: Schema.Types.ObjectId, ref: "Evaluation" },
});

export const FeedBack = model("FeedBack", FeedBackSchema);
