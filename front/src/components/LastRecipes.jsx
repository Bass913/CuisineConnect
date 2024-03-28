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
    <>
      <div className="flex  gap-5 mt-10">
        {recipes.map((recipe) => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
