import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const verifyAuthentication = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(401).send("Access denied you need to be logged in");
  }
  const user = jwt.decode(token, SECRET_KEY);

  req.user = user;
  if (!user)
    return res.status(401).send("Access denied you need to be logged in");
  next();
};

export const isManager = async (req, res, next) => {
  const user = req.user;
  if (user.role === "Employee")
    return res
      .status(401)
      .send("You are not authorized to perform this administrative task");

  next();
};
