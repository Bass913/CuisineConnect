import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { Form } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

function RecipeDetail(recipe) {
  const numberOfStars = 5;

  // Use a loop to generate an array of FontAwesome icons
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
          <h1 className="text-4xl font-bold">Titre de la recette</h1>
          <img
            src="https://source.unsplash.com/random/300x300/?2"
            alt=""
            width="400"
          />
          <span>
            <FontAwesomeIcon icon={faClock} className="self-start" />
            &nbsp;&nbsp;<b>{recipe.duration}</b> min
          </span>
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
            aut tempora, doloribus corrupti iure neque dolorem accusantium
            cupiditate et, nesciunt mollitia voluptatum omnis atque
            necessitatibus vero, libero odit placeat velit! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Eius omnis nemo iste
            reiciendis quo animi numquam aliquid, inventore, accusamus
            doloremque, tempora ipsam. Culpa praesentium error nisi, odio sit
            tempora magni!
          </p>
          <div>
            <div className="border-2 border-b-rose-500 w-1/2 p-5">
              Ingrédient 1
            </div>
            <div className="border-2 border-b-rose-500 w-1/2 p-5">
              Ingrédient 1
            </div>
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
