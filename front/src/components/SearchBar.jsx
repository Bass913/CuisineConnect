import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = new FormData(e.target).get("term");
    navigate("/recipes/search?term=" + searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-5 w-full mt-28"
    >
      <input
        type="text"
        className="w-1/2 h-10 p-7 border-2  border-gray-600 rounded focus:border-pink-600 focus:outline-none"
        placeholder="Demande moi une recette de ton choix, je me ferais un plaisir de répondre à ta requête !"
        name="term"
      />
      <Button backgroundColor="#DD1155" type="submit">
        Rechercher
      </Button>
    </form>
  );
}
