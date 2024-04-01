import React, { useState, useEffect } from "react";
import SearchBarSection from "./components/SearchBarSection.jsx";
import { NavLink, useLocation } from "react-router-dom";
import LastRecipes from "./components/LastRecipes.jsx";
import Loading from "./components/Loading.jsx";
import RecipeSearch from "./components/RecipeSearch.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    setIsLoading(true);

    fetch("http://localhost:3000/assistant/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: searchTerm }),
    })
      .then((response) => response.json())
      .then((res) => {
        setIsLoading(false);
        setRecipes(res);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("search");
    if (term !== searchTerm) {
      setSearchTerm(term || "");
    }

    if (searchTerm?.length) {
      fetchRecipes();
    }
  }, [location, searchTerm]);

  return (
    <div className="flex flex-col items-center mx-auto">
      <SearchBarSection isTall={!searchTerm.length} initialValue={searchTerm} />

      {searchTerm.length ? (
        <section className="my-28 mx-auto min-h-64 max-w-4xl w-full">
          <NavLink to="/">
            <p className="text-rose-500">Accueil</p>
          </NavLink>

          {isLoading ? (
            <>
              <h1 className="mt-5 text-2xl font-bold">
                Recherche en cours pour {searchTerm}
              </h1>
              <Loading />
            </>
          ) : (
            <div className="w-full">
              <h1 className="mt-5 text-2xl font-bold">
                Recettes pour la recherche {searchTerm}
              </h1>
              <h2 className="my-5 text-stone-400 font-normal">
                {recipes.length} résultat(s) pour {searchTerm}
              </h2>
              {recipes.length > 0 && !isLoading
                ? recipes.map((recipe, index) => (
                    <RecipeSearch key={index} recipe={recipe} />
                  ))
                : null}
            </div>
          )}
        </section>
      ) : (
        <LastRecipes />
      )}
    </div>
  );
}

export default App;
