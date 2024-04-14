const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EmailService = require("../utils/mailer.js");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password))
            throw new Error("Invalid arguments");

        // Validation du mot de passe
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            return res.status(422).json({ error: "Invalid password format" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.sendStatus(409);

        const token = require("crypto").randomBytes(32).toString("hex"); // Pour le lien de vérification du compte

        const user = new User({
            username,
            email,
            token: token,
            password: hashedPassword,
        });

        await user.save();

        const emailService = new EmailService(process.env.BREVO_API_KEY);
        const subject = "Hello ✔";
        const htmlContent = `<html><body><h1>Hello ${username}, This is an SMTP message with customizations. confirm your account by clicking on the following link: ${process.env.FRONT_URL}/verify/${token}</h1></body></html>`;
        const sender = { name: "John", email: "example@example.com" };
        const to = [{ email: email, name: username }];
        emailService.sendTransactionalEmail(
            subject,
            htmlContent,
            sender,
            to,
            null,
            null,
            null
        );

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while registering: ${error}`,
        });
    }
};

exports.verify = async (req, res, next) => {
    try {
        const user = await User.findOne({ token: req.params.token });
        if (!user) {
            const error = new Error(
                "Your verification link may have expired. Please click on resend for verify your Email."
            );
            error.statusCode = 401;
            throw error;
        }
        user.active = true;
        user.token = null;
        await user.save();
        res.sendStatus(200);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res) => {
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
            username: user.username,
            id: user._id,
            dietaryPreferences: user.dietaryPreferences,
        };

        const options = {
            expiresIn: "30d",
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        res.cookie(process.env.JWT_NAME, token, {
            httpOnly: true,
            secure: true,
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while logging in: ${error}`,
        });
    }
};

exports.logout = async (req, res, next) => {
    const token = req.cookies[process.env.JWT_NAME];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
        res.clearCookie(process.env.JWT_NAME);
        res.sendStatus(204);
    }
};
