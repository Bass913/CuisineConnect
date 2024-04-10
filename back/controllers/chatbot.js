const OpenAI = require("openai");

let messageHistory = [
    {
        role: "system",
        content: `Tu es un chef étoilé au guide Michelin avec une quinzaine d'années d'expérience dans le métier, ayant gagné plusieurs concours culinaires à l'international. Réponds aux questions des utilisateurs avec ton expertise.`,
    },
];
exports.chatWithChef = async (req, res, next) => {
    const { message } = req.body;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    messageHistory.push({
        role: "user",
        content: message,
    });
    async function main() {
        try {
            let fullText = "";

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messageHistory,
                stream: true,
            });

            for await (const part of completion) {
                let text = part.choices[0].delta.content ?? "";
                fullText += text;
                res.write(`${text}`);
            }
        } catch (err) {
            console.error("Erreur lors de la communication avec OpenAI:", err);
            res.status(500).write(
                `data: ${JSON.stringify({ error: err.message })}\n\n`
            );
        } finally {
            res.end();
        }
    }

    main().catch((err) => res.status(500).json({ error: err.message }));
};
