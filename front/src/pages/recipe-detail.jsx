import { StarIcon, ClockIcon } from "@heroicons/react/24/outline";

import { Form, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useEffect } from "react";

function RecipeDetail() {
  const numberOfStars = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state ? location.state.recipe : null;

  useEffect(() => {
    if (!recipe) {
      navigate("/");
    }
  }, [navigate, recipe]);

  if (!recipe) {
    return null; // or any loading state/component you want to display
  }

  const stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push();
    stars.push(<StarIcon key={i} className="px-1 text-yellow-500" />);
  }
  return (
    <>
      <SearchBar />
      <section className="w-1/2 mt-28 mx-auto">
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <img src={recipe.img} alt="" width="400" />
          <span>
            <ClockIcon className="self-start" />
            &nbsp;&nbsp;<b>{recipe.duration}</b> min
          </span>
          <p className="">{recipe.description}</p>
          <div>
            {recipe.ingredients.map((ingredient) => (
              // eslint-disable-next-line react/jsx-key
              <div className="border-2 border-b-rose-500 w-1/2 p-5">
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </div>
            ))}
          </div>
          <Form>
            <textarea
              className="border-2 border-black p-5"
              name=""
              id=""
              cols="50"
              rows="7"
              placeholder="Écrire un commentaire..."
            ></textarea>
            <p className="my-10">
              Noter la recette &nbsp;
              {stars}
            </p>
            <Button backgroundColor="#DD1155" type="submit">
              Envoyer
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
}

export default RecipeDetail;
