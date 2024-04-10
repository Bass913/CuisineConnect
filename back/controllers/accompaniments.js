const OpenAI = require("openai");

exports.suggestAccompaniments = async (req, res, next) => {
    const { recipe, mainIngredients } = req.body;
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    async function main() {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "Génère une liste avec des tirets de recommandations concises et directes d'accompagnements pour divers plats sans entrer dans les détails des saveurs ou des textures.",
                },
                {
                    role: "user",
                    content: `Pour le plat "${recipe}", qui utilise principalement "${mainIngredients}" de suggestions directes sans explications détaillées. Assure-toi que chaque suggestion est concise.`,
                },
            ],
        });
        res.json(completion.choices[0].message.content);
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
