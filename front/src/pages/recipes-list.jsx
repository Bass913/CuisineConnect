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
      <SearchBar />
      <section className="w-1/2 mt-28 mx-auto">
        <NavLink to="/">
          <p className="text-rose-500">Accueil</p>
        </NavLink>
        <h1 className="mt-10 text-2xl font-bold">Recette {term}</h1>
        <Suspense fallback={<Loading />}>
          {navigation.state === "loading" && <Loading />}
          <Await resolve={recipes}>
            {(recipes) => (
              <>
                <h2 className="mt-5 text-stone-400 font-bold">
                  {recipes.length} résultat(s) pour {term}
                </h2>
                <div className="mt-10">
                  {recipes.length > 0
                    ? recipes.map((recipe, index) => (
                        <RecipeSearch
                          key={index}
                          title={recipe.title}
                          ingredients={recipe.ingredients}
                          duration={recipe.duration}
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
