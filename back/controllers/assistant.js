const OpenAI = require("openai");
const recipes = require("../data/recipeData.js");
const Recipe = require("../models/recipe.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.search = async (req, res, next) => {
  const { message } = req.body;

  const recipes = await Recipe.find(
    {},
    { category: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  );
  const json = JSON.stringify(recipes);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let content = `Voici un tableau de recette au format JSON : ${json}
  Renvoies uniquement dans ce tableau les recettes qui contiennent le mot ou l'un des mots de la phrase "${message}" s'il s'agit d'une phrase.
  Si "${message}" apparaît dans le title, la description ou les ingredients d'une recette alors renvoie la recette sous format JSON.`;

  const token = req.cookies[process.env.JWT_NAME];

  if (!token) {
    console.log("Invalid Token, user may be not logged in.");
  } else {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      if (user && user.dietaryPreferences) {
        content += ` Cependant, tu ne renverras pas les recettes contenant l'une des contre-indications alimentaires suivantes : ${user.dietaryPreferences.join(
          ", "
        )}. Même si "${message}" apparaît dans le title, la description ou les ingredients de ces recettes, tu ne les renverras pas`;
      }
    } catch (error) {
      console.log("Invalid Token, user may be not logged in.");
    }
  }

  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
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
