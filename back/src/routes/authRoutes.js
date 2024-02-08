import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { profileColors } from "../lib/colors.js";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!(username && email && password))
			throw new Error("Invalid arguments");

		const hashedPassword = await bcrypt.hash(password, 10);

		const existingUser = await User.findOne({ email });
		if (existingUser) return res.sendStatus(409);

		const user = new User({
			username,
			email,
			color: profileColors[
				Math.floor(Math.random() * profileColors.length)
			],
			password: hashedPassword,
		});

		const payload = {
			userId: user._id,
		};

		const options = {
			expiresIn: "12h",
		};

		const token = jwt.sign(payload, process.env.SECRET_KEY, options);

		await user.save();

		res.json({ user, token });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while registering: ${error}`,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.sendStatus(401);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.sendStatus(401);
		}

		const payload = {
			userId: user._id,
		};

		const options = {
			expiresIn: "12h",
		};

		const token = jwt.sign(payload, process.env.SECRET_KEY, options);

		res.json({ user, token });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while logging in: ${error}`,
		});
	}
};
