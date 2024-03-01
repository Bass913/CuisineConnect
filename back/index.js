require("dotenv").config();
const cors = require("cors");
const express = require("express");
const port = process.env.PORT;
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const recipeRouter = require("./routes/recipe.js");
const categoryRouter = require("./routes/category.js");

const app = express();

app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);
app.use("/category", categoryRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, invalid_data: data });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  }
};

startServer();

app.listen(port || 3000, () => {
  console.log(`Cuisine-Connect app listening on port ${port}`);
});
