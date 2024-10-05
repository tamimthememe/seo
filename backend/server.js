const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

// Model
const { userModel } = require("./models/userModel.js");

// Route Handlers
const { createUser } = require("./Route Handlers/register.js");

// GPT Handlers
const {
  createBlog,
  generateAIKeywords,
  generateAITitle,
  generateImages,
} = require("./gpt/gpt.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/register", async (req, res) => createUser(req, res));

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ user: user, data: "success" });
      } else {
        res.json("Sorry the password is incorrect");
      }
    } else {
      res.json("Email does not exist");
    }
  });
});

app.get("/login", (req, res) => {
  const { email } = req.params;

  try {
    const user = userModel.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
  }
});

app.post("/chat/title", (req, res) => generateAITitle(req, res));
app.post("/chat/keywords", (req, res) => generateAIKeywords(req, res));
app.post("/chat/create", (req, res) => createBlog(req, res));
app.post("/chat/image", (req, res) => generateImages(req, res));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
