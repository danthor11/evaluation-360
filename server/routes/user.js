import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { SECRET_KEY } from "../config.js";
import bcrypt from "bcrypt";

export const userRouter = express.Router();

userRouter.post("/api/auth/login", async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Wrong credentials");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new Error("Wrong credentials");
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json(token);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "An error occurred on the server. Please try again later.";
    res.status(401);
    res.json({ message });
  }
});

userRouter.post("/api/auth/register", async (req, res) => {
  const { body } = req;

  try {
    const { username, email, password, role } = body;

    const exists = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (exists) throw Error("User already exists");

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});
