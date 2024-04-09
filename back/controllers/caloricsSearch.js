const OpenAI = require("openai");

exports.caloricSearch = async (req, res, next) => {
    const { recipeName, ingredients } = req.body;
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
                        "Fournis une estimation calorique pour une recette basée sur les ingrédients fournis.",
                },
                {
                    role: "user",
                    content: `Je suis un modèle de langage formé pour fournir des estimations caloriques directes pour les ingrédients ${ingredients}. Retourne uniquement une liste d'ingrédients avec les calories correspondantes et une estimation des calories totales pour la recette ${recipeName}, sans introductions ni conclusions.`,
                },
            ],
        });
        res.json({ estimation: completion.choices[0].message.content });
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
