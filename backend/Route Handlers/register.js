const { userModel } = require("../models/userModel.js");

const createUser = async (req, res) => {
  try {
    await userModel.create(req.body).catch((err) => res.json(err));
    return true;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Correct way to export the function
module.exports = { createUser };
