import SearchBar from "./components/SearchBar.jsx";
import Card from "./components/Card.jsx";

function App() {
  return (
    <>
      <section className="text-center flex flex-col items-center h-lvh">
        <SearchBar />
        <h1 className="mt-20 text-2xl font-bold">
          Découvrez nos recettes et nos recommandations
        </h1>
        <div className="flex gap-5 mt-10">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
}

export default App;
