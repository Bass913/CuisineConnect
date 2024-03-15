const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER_ROLE", "ADMIN_ROLE"],
      default: "USER_ROLE",
    },
    token: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    dietaryPreferences: {
      type: [String],
      required: false,
    },
    favoriteRecipes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
