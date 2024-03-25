require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const recipeRouter = require("./routes/recipe.js");
const categoryRouter = require("./routes/category.js");
const assistantRouter = require("./routes/assistant.js");
const chatRouter = require("./routes/chatbot.js");
const app = express();

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONT_URL, // Remplacez par l'URL de votre frontend
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);
app.use("/category", categoryRouter);
app.use("/assistant", assistantRouter);
app.use("/chat", chatRouter);

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
