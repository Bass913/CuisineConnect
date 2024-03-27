const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: false
  }
});

const reviewsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' ,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    category: {
      type: Array,
      required: true
    },
    averageRating: {
      type: Number,
      required: false
    },
    reviews: {
      type: [reviewsSchema],
      required: false
      
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
