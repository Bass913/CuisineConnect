import {
	useSearchParams,
	Await,
	useLoaderData,
	useNavigation,
	NavLink,
} from "react-router-dom";
import Loading from "../components/Loading";
import RecipeSearch from "../components/RecipeSearch";
import SearchBar from "../components/SearchBar";
import { Suspense } from "react";

function RecipesList() {
	const [searchParams] = useSearchParams();
	const term = searchParams.get("term");
	const { recipes } = useLoaderData();
	const navigation = useNavigation();

	return (
		<>
			<div className="w-full h-2O md:h-32 flex items-center justify-center px-10 sm:px-5 mt-20">
				<SearchBar />
			</div>
			<section className="mt-28 mx-auto min-h-64 max-w-4xl">
				<NavLink to="/">
					<p className="text-rose-500">Accueil</p>
				</NavLink>
				<h1 className="mt-10 text-2xl font-bold">
					Recettes pour la recherche {term}
				</h1>
				<Suspense fallback={<Loading />}>
					{navigation.state === "loading" && <Loading />}
					<Await resolve={recipes}>
						{(recipes) => (
							<>
								<h2 className="mt-5 text-stone-400 font-bold">
									{recipes.length}
									résultat(s) pour {term}
								</h2>
								<div className="mt-10">
									{recipes.length > 0
										? recipes.map((recipe, index) => (
												<RecipeSearch
													key={index}
													recipe={recipe}
												/>
										  ))
										: null}
								</div>
							</>
						)}
					</Await>
				</Suspense>
			</section>
		</>
	);
}

export default RecipesList;
