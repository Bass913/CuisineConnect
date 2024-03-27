import SearchBar from "./components/SearchBar.jsx";
import LastRecipes from "./components/LastRecipes.jsx";

function App() {
  return (
    <>
      <section className="text-center flex flex-col items-center">
        <SearchBar />
        <h1 className="mt-20 text-2xl font-bold">
          Découvrez nos recettes et nos recommandations
        </h1>
        <div className="flex gap-5 mt-10">
          <LastRecipes />
        </div>
      </section>
    </>
  );
}

export default App;
