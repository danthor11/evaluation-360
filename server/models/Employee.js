import { model, Schema } from "mongoose";
import { User } from "./User.js";

const EmployeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  department: { type: String, required: true },
  job_title: { type: String, required: true },
  user: User,
});

export const Employee = model("Employee", EmployeeSchema);
