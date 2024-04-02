const OpenAI = require("openai");
const Recipe = require("../models/recipe.js");

exports.recommendation = async (req, res) => {
  const { recipeId } = req.params;

  const recipes = await Recipe.find(
    {},
    { category: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  );
  const recipesJson = JSON.stringify(recipes);

  const recipe = await Recipe.findById(recipeId);

  const prompt = `Voici un tableau de recettes : ${recipesJson}. Renvoies 3 recettes maximum de ce tableau au format JSON qui a des similitudes avec cette recette : ${JSON.stringify(recipe)}, Ta réponse doit être un tableau d'objet json.`;
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  async function main() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: JSON.stringify(recipe),
        },
      ],
    });
    res.json(JSON.parse(completion.choices[0].message.content));
  }
  main().catch((err) => res.status(500).json({ error: err.message }));
};
