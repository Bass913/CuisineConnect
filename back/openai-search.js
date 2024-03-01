const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Je peux te fournir un modèle de base et tu t'entraines dessus pour me retourner les recettes de ma base de données quand je te donne des ingrédients, un nom de recette ou autre ?",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
