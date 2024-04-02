const Recipe = require("../models/recipe.js");
const simpleRecipeData = require("../data/Dessert.js");
const User = require("../models/user.js");


exports.getRecipe = async (req, res) => {
	try {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) return res.sendStatus(404);
		res.json(recipe);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while fetching recipe: ${error}`,
		});
	}

}

exports.getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find()
			.sort({ duration: 1 })
			.limit(4)
			;
		res.json(recipes);
	} catch (err) {
		res.status(500).json({
			message: `An error occurred while fetching recipes: ${err}`,
		});
	}
};

exports.createRecipe = async (req, res) => {
	try {
		const { title, img, description, ingredients, tags, duration, category } = req.body;
		if (!(title && description && ingredients && duration && category)) return res.sendStatus(400);

		const categoryObject = await Category.findById(categoryId);
		if (!categoryObject) return res.sendStatus(404);

		const recipe = new Recipe({
			title,
			img,
			description,
			ingredients,
			tags,
			duration,
			category
		});

		await recipe.save();

		res.sendStatus(201);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating recipe: ${error}`,
		});
	}

}

exports.createManyRecipe = async (req, res) => {
	try {

		if (!simpleRecipeData.length) return res.sendStatus(400);
		//await Recipe.deleteMany({});

		await Recipe.insertMany(simpleRecipeData);

		res.sendStatus(201);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating recipes: ${error}`,
		});
	}


}

exports.addReview = async (req, res) => {
	try {
		const { comment, rating } = req.body;
		
		const user = await User.findById(req.user.id);
        if (!user) return res.sendStatus(404);

		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) return res.sendStatus(404);

		const existingReview = recipe.reviews.find(review => review.user.toString() === user._id.toString() && review.comment === comment);
		if (existingReview) return res.sendStatus(409);

		recipe.reviews.push({ user: user._id, comment, rating});

		const totalRating = recipe.reviews.reduce((acc, review) => acc + review.rating, 0);
  		const averageRating = totalRating / recipe.reviews.length;
		
		recipe.averageRating = averageRating.toFixed(1);

		await recipe.save();

		res.sendStatus(201);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while adding review: ${error}`,
		});
	}

}

exports.getAverageRating = async (req, res) => {
	try {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) return res.sendStatus(404);
		res.json(recipe.averageRating);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while fetching average rating: ${error}`,
		});
	}

}



exports.getReviews = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId).populate('reviews.user', 'username'); // Ajoutez .populate() pour récupérer les utilisateurs correspondants

        if (!recipe) return res.sendStatus(404);

        const reviewsWithUsername = recipe.reviews.map(review => {
            return {
				id: review._id,
                comment: review.comment,
                username: review.user.username, 
                createdAt: review.createdAt
            };
        });

        res.json(reviewsWithUsername);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while fetching reviews: ${error}`,
        });
    }
}


exports.deleteRecipe = async (req, res) => {
	try {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findByIdAndDelete(recipeId);
		if (!recipe) return res.sendStatus(404);
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting recipe: ${error}`,
		});
	}

};


