import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import cors from "cors";
import express from "express";
const port = process.env.PORT;
import mongoose from "mongoose";
const app = express();

app.listen(port || 3000, () => {
  console.log(`Cuisine-Connect app listening on port ${port}`);
});

app.use(express.urlencoded({ extended: true, limit: "16mb" })); // Adjust the limit as needed
app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, invalid_data: data });
});

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to database");
} catch (e) {
  console.error(e);
}
