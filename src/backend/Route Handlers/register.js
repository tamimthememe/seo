import { userModel } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    await userModel.create(req.body).catch((err) => res.json(err));
    return true;
  } catch (error) {
    console.log(error);
  }
};
