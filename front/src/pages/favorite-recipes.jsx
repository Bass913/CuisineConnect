import { useEffect, useState } from "react";
import { getUserFavorites, removeFavorite } from "../api/user";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import {
	HeartIcon as SolidHeartIcon,
	EyeIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import SearchBarSection from "../components/SearchBarSection";
import DefaultLayout from "../layouts/DefaultLayout";

export default function FavoriteRecipes() {
	const [favoriteRecipes, setFavoriteRecipes] = useState([]);

	const removeFromFavorites = async (recipe) => {
		const response = await removeFavorite(recipe);
		if (response.status === 200) {
			getFavorites();
		} else {
			console.log("Error removing recipe from favorites");
		}
	};

	const getFavorites = async () => {
		getUserFavorites().then((res) => {
			setFavoriteRecipes(res);
		});
	};

	useEffect(() => {
		getFavorites();
	}, []);

	return (
		<DefaultLayout>
			<SearchBarSection isTall={false} />

			<div className="flex items-center my-16">
				<div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
					<h2 className="mb-4 text-2xl font-semibold leading-tight flex gap-5">
						Mes recettes favorites
						<SolidHeartIcon className=" text-rose-500 w-8 p-1" />
					</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full text-xs">
							<colgroup>
								<col />
								<col />
								<col />
								<col />
								<col />
								<col className="w-24" />
							</colgroup>
							<thead className="dark:bg-gray-300">
								<tr className="text-left">
									<th className="p-3">Nom de la recette</th>
									<th className="p-3">Description</th>
									<th className="p-3">
										Durée de préparation
									</th>
									<th className="p-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{favoriteRecipes.map((recipe) => (
									<tr
										key={recipe._id}
										className="border-b border-gray-300"
									>
										<td className="p-6">
											<p>{recipe.title}</p>
										</td>
										<td className="p-6">
											<p>{recipe.description}</p>
										</td>
										<td className="p-6">
											<p>{recipe.duration} Minutes</p>
										</td>
										<td className="p-6 text-right">
											<NavLink
												to={`/recipe/${slugify(
													recipe.title
												)}`}
												state={{ recipe: recipe }}
											>
												<EyeIcon className=" text-rose-500 w-8 p-1" />
											</NavLink>
										</td>
										<td className="p-6 text-right">
											<TrashIcon
												onClick={() =>
													removeFromFavorites(
														recipe._id
													)
												}
												className=" text-rose-500 w-8 p-1"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
