import "./App.css";
import Card from "./components/Card.jsx";
import Button from "./components/Button.jsx";

function App() {
  return (
    <>
      <section className="mt-28 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-5 w-full">
          <input
            className="w-1/2 h-10 p-7 border-2  border-gray-600 rounded"
            placeholder="Demande moi une recette de ton choix, je me ferais un plaisir de répondre à ta requête !"
            type="text"
          />
          <Button backgroundColor="#DD1155">Rechercher</Button>
        </div>
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
