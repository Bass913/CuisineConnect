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
import "../RecipeSearch.css";

export default function RecipeSearch({ recipe }) {
	const [showModal, setShowModal] = useState(false);
	const [accompaniments, setAccompaniments] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
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
			});
	};

	const accompanimentsListItems = Array(accompaniments).map((item, index) => (
		<li key={index}>{item}</li>
	));

	return (
		<>
			<article className="border border-t-slate-300 p-10 flex mb-5 gap-10">
				<img src={recipe.img} alt="" width="250" />
				<div className="flex flex-col justify-around gap-7">
					{user &&
						(isFavorite ? (
							<SolidHeartIcon
								className="self-end text-rose-500 w-7"
								onClick={() => removeFromFavorites(recipe._id)}
							/>
						) : (
							<HeartIcon
								className="self-end text-rose-500 w-7"
								onClick={() => addToFavorites(recipe._id)}
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
						<SparklesIcon className="w-7 h-7" />
					</button>

					<h2 className="text-2xl font-bold">
						Recette : {recipe.title}
					</h2>
					<div className="flex items-center">
						<ClockIcon className="self-start w-5" />
						&nbsp;&nbsp;<b>{recipe.duration}</b> min &nbsp;&nbsp;
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

			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				title={`Accompagnements pour  ${recipe?.title}`}
				accompaniments={accompaniments}
			>
				{accompanimentsListItems}
			</Modal>
		</>
	);
}
