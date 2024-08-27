import express from "express";
import { Employee } from "../models/Employee.js";

export const employeeRoute = express.Router();

employeeRoute.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.json(employees);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

employeeRoute.post("/api/employees", async (req, res) => {
  const body = req.body;
  const { first_name, last_name, department, job_title, user, start_date } =
    body;
  try {
    const employee = await Employee.create({
      department,
      first_name,
      job_title,
      last_name,
      user,
      evaluations,
      start_date,
    });
    res.status(201).json(employee);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});
