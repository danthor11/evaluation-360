import { model, Schema } from "mongoose";

const EmployeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  department: { type: String, required: true },
  job_title: { type: String, required: true },
  start_date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  evaluations: [{ type: Schema.Types.ObjectId, ref: "Evaluation" }],
});

export const Employee = model("Employee", EmployeeSchema);
