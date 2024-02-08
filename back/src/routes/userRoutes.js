import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId).select("-password");
		if (!user)
			return res
				.status(404)
				.json({ error: "L'utilisateur n'existe pas" });
		res.json(user);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while fetching user: ${error}`,
		});
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		res.status(500).json({
			message: `An error occurred while fetching users: ${err}`,
		});
	}
};

export const createUser = async (req, res) => {
	try {
		const { username, email, password, role = "USER_ROLE" } = req.body;
		if (!(username && email && password)) return res.sendStatus(400);

		const hashedPassword = await bcrypt.hash(password, 10);

		const existingUser = await User.findOne({ email });
		if (existingUser) return res.sendStatus(409);

		const user = new User({
			username,
			email,
			password: hashedPassword,
			role,
		});

		await user.save();

		res.sendStatus(201);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating user: ${error}`,
		});
	}
};

export const updateUser = async (req, res) => {
	try {
		const userId = req.params.userId;
		const { username, email, role, password, newPassword, oldPassword } = req.body;

		const user = await User.findById(userId);
		if (!user) return res.sendStatus(404);

		const userQuery = {};
		if (username) userQuery.username = username;
		if (email) userQuery.email = email;
		if (password) userQuery.password = await bcrypt.hash(password, 10);
		if (newPassword && oldPassword) {
			const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
			if (!isPasswordValid) return res.sendStatus(401);
			userQuery.password = await bcrypt.hash(newPassword, 10);
		}

		await User.findByIdAndUpdate(userId, userQuery);
		const updatedUser = await User.findById(userId).select("-password");

		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating user: ${error}`,
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findByIdAndDelete(userId);
		if (!user) return res.sendStatus(404);
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting user: ${error}`,
		});
	}
};
