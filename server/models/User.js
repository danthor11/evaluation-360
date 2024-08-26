import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, index: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee"],
    required: true,
  },
});

export const User = model("User", UserSchema);
