const OpenAI = require("openai");

exports.suggestAccompaniments = async (req, res, next) => {
    const { recipe } = req.body;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    async function main() {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Tu es un sommelier expert avec une vaste connaissance des accords mets et vins, des desserts et des fromages adaptés à une grande variété de plats.",
                    },
                    {
                        role: "user",
                        content: `Quels seraient les meilleurs accompagnements pour cette recette : ${recipe} ? Pense à des vins, des desserts ou des fromages qui pourraient compléter le plat.`,
                    },
                ],
            });
            console.log("completion :", completion.choices[0].message.content);
            res.json({ response: completion.choices[0].message.content });
        } catch (error) {
            console.error(
                "Erreur lors de la suggestion d'accompagnements : ",
                error
            );
            res.status(500).json({ error: error.message });
        }
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
