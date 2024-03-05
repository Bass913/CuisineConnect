import SearchBar from "../components/SearchBar";

function RecipesList() {
  return (
    <>
      <SearchBar />
      <section className="w-1/2 mt-28 mx-auto">
            <p className="text-rose-500">Accueil</p>
            <h1 className="mt-10 text-2xl font-bold">Recette SEARCH</h1>
            <h2 className="mt-5 text-stone-400 font-bold">X résultats pour SEARCH</h2>
      </section>
    </>
  );
}

export default RecipesList;
