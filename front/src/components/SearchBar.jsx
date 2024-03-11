import { Form } from "react-router-dom";
import Button from "./Button.jsx";

export default function SearchBar() {
  return (
    <Form
      method="get"
      action="/recipes/search"
      className="flex items-center justify-center gap-5 w-full mt-28"
    >
      <input
        type="text"
        aria-label="search recipes"
        className="w-1/2 h-10 p-7 border-2  border-gray-600 rounded focus:border-pink-600 focus:outline-none"
        placeholder="Demande moi une recette de ton choix, je me ferais un plaisir de répondre à ta requête !"
        name="term"
      />
      <Button backgroundColor="#DD1155" type="submit">
        Rechercher
      </Button>
    </Form>
  );
}
