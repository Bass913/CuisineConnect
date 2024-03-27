const OpenAI = require("openai");

exports.generateIntelligentShoppingList = async (req, res) => {
    const { shoppingList } = req.body;
    const prompt = `Génère une liste de courses pour une recette contenant comme ingrédients : ${shoppingList}. Pour chaque ingrédient, fournis une quantité adaptée à un achat en grande surface ou en épicerie, arrondissant si nécessaire à l'unité supérieure. Par exemple, si la recette nécessite 1,5 tomate, la liste devrait inclure 2 tomates. La liste doit être claire, concise et inclure des quantités estimées pour chaque produit en kg, pièces, ou ml selon ce qui est le plus approprié.  Ne rajoute pas de commentaire ou de suggestion de recette après la liste des ingrédients.`;
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
