const OpenAI = require("openai");

exports.suggestAccompaniments = async (req, res, next) => {
    const { recipe, mainIngredients } = req.body;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    console.log("req.body", req.body);
    async function main() {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "En tant que un connaisseur gastronomique. Génère une liste de recommandations concises et directes d'accompagnements pour divers plats sans entrer dans les détails des saveurs ou des textures.",
                },
                {
                    role: "user",
                    content: `Pour le plat "${recipe}", qui utilise principalement "${mainIngredients}" Je cherche une liste non numérotée de suggestions directes sans explications détaillées. Assure-toi que chaque suggestion est concise. Exemple de format attendu :
                    - Vins : ...
                    - Desserts : ...
                    - Fromages : ...`,
                },
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
