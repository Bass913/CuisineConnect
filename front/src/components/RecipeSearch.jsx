import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function RecipeSearch({ title, ingredients, duration }) {
  return (
    <article className="border border-t-slate-300 p-10 flex mb-5 gap-10">
      <img
        src="https://source.unsplash.com/random/300x300/?2"
        alt=""
        width="200"
        height="45"
      />
      <div className="flex flex-col justify-around">
        <h2 className="text-2xl font-bold">Recette : {title}</h2>
        <span>
          <FontAwesomeIcon icon={faClock} className="self-start" />
          &nbsp;&nbsp;<b>{duration}</b> min
        </span>
        <p className="items-end">
          <b>Ingrédients</b> :&nbsp;
          {ingredients
            .map(
              (ingredient) =>
                `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`
            )
            .join(", ")}
        </p>
      </div>
    </article>
  );
}
