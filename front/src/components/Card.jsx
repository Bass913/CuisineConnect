import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import Favorite from "./Favorite";
import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Card({ recipe }) {
	return (
		<div className="flex flex-col justify-between max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
			<img
				src={recipe.img}
				alt=""
				className="object-cover object-center w-full rounded-t-md h-64 dark:bg-gray-500"
			/>
			<div className="flex flex-col justify-between p-3 space-y-8">
				<div>
					<h2 className="text-sm font-semibold mb-1">
						{recipe.title}
					</h2>
					<div className="flex items-center justify-between">
						<div className="flex items-center text-gray-500 text-sm">
							<ClockIcon className="self-start w-4 mt-0.5 mr-1" />
							{recipe.duration} min
						</div>
						{/* note en fonction de recipe.averageRating */}
						<div className="flex flex-col gap-1">
							<div className="flex items-center text-gray-500">
								<StarIcon className="self-start w-4 mt-0.5 mr-1 text-rose-500 fill-current" />
								<span className="text-rose-500 text-sm">
									{" "}
									{recipe.averageRating}
								</span>
							</div>
						</div>
					</div>
				</div>
				<NavLink
					to={`/recipe/${slugify(recipe.title)}`}
					state={{ recipe: recipe }}
					className="bg-rose-600 p-2 text-white text-center font-bold rounded text-xs hover:bg-rose-700"
				>
					Voir le détail
				</NavLink>
				<Favorite recipe={recipe} />
			</div>
		</div>
	);
}
