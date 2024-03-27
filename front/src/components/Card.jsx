import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import Favorite from "./Favorite";


export default function Card({ recipe }) {
  return (
    <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
      <img
        src={recipe.img}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracki">{recipe.title}</h2>

        </div>
        <NavLink
          to={`/recipe/${slugify(recipe.title)}`}
          state={{ recipe: recipe }}
          className="bg-rose-600 p-3 w-1/2 text-white text-center font-bold rounded"
        >
          Voir le détail
        </NavLink>
        <Favorite recipe={recipe} />
      </div>
    </div>
  );
}
