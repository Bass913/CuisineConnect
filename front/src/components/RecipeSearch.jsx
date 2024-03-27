/* eslint-disable react/prop-types */
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useUser } from "../hooks/useUser";
import {
  HeartIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import { getUserFavorites, addFavorite, removeFavorite } from "../api/user";
import "../RecipeSearch.css";
import "../App.css";

export default function RecipeSearch({ recipe }) {
  const [showModal, setShowModal] = useState(false);
  const [accompaniments, setAccompaniments] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();



  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getUserFavorites();
      if (favorites) {
        const favoriteIds = favorites.map(favorite => favorite._id);
        setIsFavorite(favoriteIds.includes(recipe._id));
      }
    }

    if (user) {
      fetchFavorites();
    }
  }, [user, recipe._id]);


  const addToFavorites = async (recipe) => {
    const response = await addFavorite(recipe);
    if (response.status === 201) {
      setIsFavorite(true);
      console.log("Recipe added to favorites");

    } else {
      console.log("Error adding recipe to favorites");
    }

  };

  const removeFromFavorites = async (recipe) => {
    const response = await removeFavorite(recipe);
    if (response.status === 200) {
      setIsFavorite(false);
      console.log("Recipe removed from favorites");
    } else {
      console.log("Error removing recipe from favorites");
    }
  }


  const fetchAccompaniments = async (recipe) => {
    try {
      const response = await fetch(
        "http://localhost:3000/suggest/accompaniments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipe: recipe }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const suggestions = data.response
          .split(/\d+\.\s/)
          .filter(Boolean);
        setAccompaniments(suggestions);
        setShowModal(true);
      } else {
        console.log("Erreur lors de la récupération des suggestions");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <>

      <article className="border border-t-slate-300 p-10 flex mb-5 gap-10">
        <img src={recipe.img} alt="" width="250" />
        <div className="flex flex-col justify-around gap-7">
          {
            user && (
              isFavorite ?
                <SolidHeartIcon className="self-end text-rose-500 w-7" onClick={() => removeFromFavorites(recipe._id)} />
                : <HeartIcon className="self-end text-rose-500 w-7" onClick={() => addToFavorites(recipe._id)} />
            )
          }
          <button
            onClick={() => fetchAccompaniments(recipe.title)}
            className=" rounded-full self-end text-rose-500 hover:bg-rose-200"
            aria-label="Suggest Accompaniments"
          >
            <SparklesIcon className="w-7 h-7" />
          </button>

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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "black",
                fontSize: "24px",
              }}
            >
              Accompagnements pour {recipe.title}
            </h1>
            <br></br>
            <ul>
              {accompaniments.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
