const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subscription: String,
  generations: Number,
  subscriptionId: String,
});

const userModel = mongoose.model("Users", userSchema);
module.exports = { userModel };
