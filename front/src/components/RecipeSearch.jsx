import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";

/* eslint-disable react/prop-types */
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useUser } from "../hooks/useUser";
import {
    ClockIcon,
    SparklesIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

import { getUserFavorites, addFavorite, removeFavorite } from "../api/user";
import Modal from "../components/Modal";
import "../css/RecipeSearch.css";

export default function RecipeSearch({ recipe }) {
    const [showModal, setShowModal] = useState(false);
    const [accompaniments, setAccompaniments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        const fetchFavorites = async () => {
            const favorites = await getUserFavorites();
            if (favorites) {
                const favoriteIds = favorites.map((favorite) => favorite._id);
                setIsFavorite(favoriteIds.includes(recipe._id));
            }
        };

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
    };

    const fetchAccompaniments = async (recipe, mainIngredients) => {
        setIsLoading(true);
        fetch("http://localhost:3000/suggest/accompaniments", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipe: recipe,
                mainIngredients: mainIngredients,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setAccompaniments(data.response);
                setShowModal(true);
            })

            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération de la liste de courses : ",
                    error
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const accompanimentsListItems = accompaniments.startsWith("-")
        ? accompaniments.slice(1).trim().split("-")
        : accompaniments.split("-");

    return (
        <>
            <article className="border flex mb-5 gap-5 shadow-md rounded-md bg-white hover:bg-gray-50 overflow-hidden h-52">
                <img src={recipe.img} alt="" className="w-1/2 object-cover" />
                <div className="flex flex-col justify-between w-1/2 p-5">
                    <div className="flex justify-between gap-5 w-full">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {recipe.title}
                            </h2>
                            <div className="flex items-center text-gray-500">
                                <ClockIcon className="self-start w-5 mt-0.5 mr-1" />
                                {recipe.duration} min
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {user &&
                                (isFavorite ? (
                                    <SolidHeartIcon
                                        className="self-end text-rose-500 w-8 h-8 cursor-pointer hover:bg-rose-200 rounded-full p-1"
                                        onClick={() =>
                                            removeFromFavorites(recipe._id)
                                        }
                                    />
                                ) : (
                                    <HeartIcon
                                        className="self-end text-rose-500 w-8 h-8 cursor-pointer hover:bg-rose-200 rounded-full p-1"
                                        onClick={() =>
                                            addToFavorites(recipe._id)
                                        }
                                    />
                                ))}

                            <button
                                onClick={() =>
                                    fetchAccompaniments(
                                        recipe.title,
                                        recipe.ingredients
                                    )
                                }
                                className=" rounded-full self-end text-rose-500 hover:bg-rose-200"
                                aria-label="Suggest Accompaniments"
                            >
                                <SparklesIcon className="self-end text-rose-500 w-8 h-8 cursor-pointer hover:bg-rose-200 rounded-full p-1" />
                            </button>
                        </div>
                    </div>
                    {/* <p className="items-end">
						<b>Ingrédients</b> :&nbsp;
						{recipe.ingredients
							.map(
								(ingredient) =>
									`${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`
							)
							.join(", ")}
					</p> */}
                    <NavLink
                        to={`/recipe/${slugify(recipe.title)}`}
                        state={{ recipe: recipe }}
                        className="bg-rose-600 p-3 w-full text-white text-center font-semibold rounded-sm hover:bg-rose-700 text-sm"
                    >
                        Voir le détail
                    </NavLink>
                </div>
            </article>

            <>
                {isLoading && (
                    <div className="loader-overlay">
                        <div className="loader"></div>
                    </div>
                )}

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={`Accompagnements pour  ${recipe?.title}`}
                    accompaniments={accompaniments}
                >
                    <ul>
                        {accompanimentsListItems.map((ingredient, index) => (
                            <li key={index}>
                                {index > 0
                                    ? `- ${ingredient.trim()}`
                                    : ingredient.trim()}
                            </li>
                        ))}
                    </ul>
                </Modal>
            </>
        </>
    );
}
