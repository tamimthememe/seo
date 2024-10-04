import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subscription: String,
});

export const userModel = mongoose.model("Users", userSchema);
