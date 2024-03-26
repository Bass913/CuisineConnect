const OpenAI = require("openai");

exports.generateIntelligentShoppingList = async (req, res) => {
    const { shoppingList } = req.body;
    const prompt = `Liste les ingrédients nécessaires pour une recette contenant : ${shoppingList}. Fournis une liste claire et concise, incluant des quantités estimées et des recommandations de produits.`;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    async function main() {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Tu es un chef étoilé...",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    }
    main().catch((err) => res.status(500).json({ error: err.message }));
};
