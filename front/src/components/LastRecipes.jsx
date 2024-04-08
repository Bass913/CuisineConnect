import React, { useEffect, useState } from "react";
import { getRecipes } from "../api/recipe";
import Card from "./Card";

export default function LastRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes();
      setRecipes(recipes);
    };

    fetchRecipes();
  }, []);

  return (
	<div className="flex flex-col items-center mx-auto max-w-5xl my-16">
	  <h1 className="text-xl font-semibold text-center mb-12">Dernières recettes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto">
        {recipes.map((recipe) => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
