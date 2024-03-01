const Category = require("../models/category.js");

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while fetching categories: ${error}`,
		});
	}
}

exports.getCategory = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const category = await Category
			.findById(categoryId)
			.populate("recipes");
		if (!category) return res.sendStatus(404);
		res.json(category);
	}
	catch (error) {
		res.status(500).json({
			error: `An error occurred while fetching category: ${error}`,
		});
	}
}

exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) return res.sendStatus(400);

		const category = new Category({
			name
		});

		await category.save();

		res.sendStatus(201);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating category: ${error}`,
		});
	}
}

exports.deleteCategory = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const category = await Category.findById(categoryId);
		if (!category) return res.sendStatus(404);
		await category.delete();
		res.sendStatus(200);
	}
	catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting category: ${error}`,
		});
	}	
}

exports.updateCategory = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const { name } = req.body;
		if (!name) return res.sendStatus(400);

		const category = await Category.findById(categoryId);
		if (!category) return res.sendStatus(404);

		category.name = name;
		await category.save();
		res.sendStatus(200);
	}
	catch (error) {
		res.status(500).json({
			error: `An error occurred while updating category: ${error}`,
		});
	}
}

