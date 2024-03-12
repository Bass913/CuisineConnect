const OpenAI = require("openai");
const recipes = require("../data/recipeData.js");

exports.search = async (req, res, next) => {
  const { message } = req.body;
  const json = JSON.stringify(recipes);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Voici un tableau de recette : '${json}'
          Renvoies uniqument dans ce tableau les recettes qui contiennent la saisie de l'utilisateur : ${message}.
          Si '${message}' apparaît dans l'un des ingrédients d'une recette alors renvoie la recette avec tous ses ingrédients sous format JSON.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    res.json(JSON.parse(completion.choices[0].message.content));
  }

  main();
};
