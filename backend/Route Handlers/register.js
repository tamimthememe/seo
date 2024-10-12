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

const updateSub = async (req, res) => {
  const userId = req.body.userId;
  const subscriptionId = req.body.subscriptionId;
  const plan = req.body.subscription;
  const generations = req.body.generations;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        subscriptionId: subscriptionId,
        subscription: plan,
        generations: generations,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

const updateGen = async (req, res) => {
  const userId = req.body.userId;
  const generations = req.body.generations;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        generations: generations,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};
// Correct way to export the function
module.exports = { createUser, updateSub, updateGen };
