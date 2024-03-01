const Recipe = require("../models/recipe.js");
const simpleRecipeData = require("../data/Dessert.js");

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
		const recipes = await Recipe.find();
		res.json(recipes);
	} catch (err) {
		res.status(500).json({
			message: `An error occurred while fetching recipes: ${err}`,
		});
	}
};

exports.createRecipe = async (req, res) => {
	try {
		const { title, img, description, ingredients, tags, duration, category} = req.body;
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



exports.updateRecipe = async (req, res) => {
	try {
		const recipeId = req.params.recipeId;
		const { title, img, description, ingredients, tags, duration } = req.body;

		const recipe = await Recipe.findById(recipeId);
		if (!recipe) return res.sendStatus(404);

		const recipeQuery = {};
		if (title) recipeQuery.title = title;
		if (img) recipeQuery.img = img;
		if (description) recipeQuery.description = description;
		if (ingredients) recipeQuery.ingredients = ingredients;
		if (tags) recipeQuery.tags = tags;
		if (duration) recipeQuery.duration = duration;

		await Recipe.findByIdAndUpdate(recipeId, recipeQuery);
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating recipe: ${error}`,
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
