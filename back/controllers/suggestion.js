const OpenAI = require("openai");

exports.suggestAccompaniments = async (req, res, next) => {
    const { recipe, mainIngredients } = req.body;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    async function main() {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "Tu es un connaisseur gastronomique. Fournis des recommandations concises et directes d'accompagnements pour divers plats sans entrer dans les détails des saveurs ou des textures.",
                },
                {
                    role: "user",
                    content: `Pour le plat "${recipe}", qui utilise principalement ${mainIngredients.join(
                        ", "
                    )}, Je cherche des suggestions directes sans explications détaillées , donne-moi sous forme de  liste numérotée d'accords mets et vins, desserts, et fromages. Utilise des sauts de ligne pour séparer chaque catégorie et assure-toi que chaque suggestion est concise. Exemple de format attendu :
                    1 - Vins : ...
                    2 - Desserts : ...
                    3 - Fromages : ...`,
                },
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
