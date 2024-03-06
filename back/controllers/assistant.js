const OpenAI = require("openai");
const recipes = require("../data/recipeData.js");

exports.search = async (req, res, next) => {
  const json = JSON.stringify(recipes);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Voici un tableau de recettes : '${json}' 
          j'aimerais que chacune de tes réponses soit l'un des objets ou une liste d'objets contenu(s) si plusieurs objets match avec le message dans cette liste et rien d'autres.
          Retourne toujours la réponse sous format JSON sans saut de ligne.`,
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    res.json(completion.choices[0].message.content);
  }

  main();
};
