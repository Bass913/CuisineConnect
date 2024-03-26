/* eslint-disable react/prop-types */
import { HeartIcon, ClockIcon } from "@heroicons/react/24/outline";

import { useState } from "react";

import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import { addFavorite } from "../api/user";

export default function RecipeSearch({ recipe }) {

  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = async (recipe) => {
    const response = await addFavorite(recipe);
    if (response.status === 201) {
      console.log("Recipe added to favorites");
      setIsFavorite(!isFavorite);
    } else {
      console.log("Error adding recipe to favorites");
    }
    
    
  };



  return (
    <article className="border border-t-slate-300 p-10 flex mb-5 gap-10">
      <img src={recipe.img} alt="" width="250" />
      <div className="flex flex-col justify-around gap-7">
        <HeartIcon className="self-end text-rose-500 w-7" onClick={() => addToFavorites(recipe._id)}/>

        <h2 className="text-2xl font-bold">Recette : {recipe.title}</h2>
        <div className="flex items-center">
          <ClockIcon className="self-start w-5" />
          &nbsp;&nbsp;<b>{recipe.duration}</b> min
        </div>
        <p className="items-end">
          <b>Ingrédients</b> :&nbsp;
          {recipe.ingredients
            .map(
              (ingredient) =>
                `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`
            )
            .join(", ")}
        </p>
        <NavLink
          to={`/recipe/${slugify(recipe.title)}`}
          state={{ recipe: recipe }}
          className="bg-rose-600 p-3 w-1/2 text-white text-center font-bold rounded"
        >
          Voir le détail
        </NavLink>
      </div>
    </article>
  );
}
