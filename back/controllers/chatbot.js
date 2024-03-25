const OpenAI = require("openai");

exports.chatWithChef = async (req, res, next) => {
  const { message } = req.body;
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  async function main() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Tu es un chef étoilé au guide Michelin avec une quinzaine d'années d'expérience dans le métier, ayant gagné plusieurs concours culinaires à l'international. Réponds aux questions des utilisateurs avec ton expertise.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    res.json({ response: completion.choices[0].message.content });
  }

  main().catch((err) => res.status(500).json({ error: err.message }));
};
