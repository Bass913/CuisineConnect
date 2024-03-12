import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { Form, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

function RecipeDetail() {
  const numberOfStars = 5;
  const location = useLocation();
  const recipe = location.state ? location.state.recipe : null;
  
  const stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} className="px-1 text-yellow-500" />
    );
  }
  return (
    <>
      <SearchBar />
      <section className="w-1/2 mt-28 mx-auto">
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <img
            src="https://source.unsplash.com/random/300x300/?2"
            alt=""
            width="400"
          />
          <span>
            <FontAwesomeIcon icon={faClock} className="self-start" />
            &nbsp;&nbsp;<b>{recipe.duration}</b> min
          </span>
          <p className="">{recipe.description}</p>
          <div>
            {recipe.ingredients.map((ingredient) => (
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
