import "../App.css";
import {
    ClockIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";

import { Form, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Comment from "../components/RecipeComment";
import { useEffect, useState } from "react";
import Favorite from "../components/Favorite";
import "../css/Loader.css";

function RecipeDetail() {
    const [showModal, setShowModal] = useState(false);
    const [shoppingListText, setShoppingListText] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const recipe = location.state ? location.state.recipe : null;
    const generateShoppingList = () => {
        setIsLoading(true);
        const ingredientsText = recipe.ingredients
            .map((ing) => `${ing.quantity} ${ing.unit} ${ing.name}`)
            .join(", ");

        fetch("http://localhost:3000/list/generate", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ shoppingList: ingredientsText }),
        })
            .then((response) => response.json())
            .then((data) => {
                const listText = data.response;

                navigator.clipboard.writeText(listText);
                setShoppingListText(data);
                setShowModal(true);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération de la liste de courses : ",
                    error
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const shoppingListItems = shoppingListText.startsWith("-")
        ? shoppingListText.slice(1).trim().split("-")
        : shoppingListText.split("-");

    useEffect(() => {
        if (!recipe) {
            navigate("/");
        }
    }, [navigate, recipe]);

    if (!recipe) {
        return null; // or any loading state/component you want to display
    }
    
    return (
        <>
            <div className="w-full h-2O md:h-32 flex items-center justify-center px-10 sm:px-5 mt-20">
                <SearchBar />
            </div>
            <section className="w-1/2 mt-28 mx-auto">
                <div className="flex flex-col gap-10">
                    <h1 className="text-4xl font-bold">{recipe.title}</h1>{" "}
                    <div className="flex items-center ">
                        <Button
                            onClick={generateShoppingList}
                            className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
                        >
                            <LightBulbIcon
                                className="h-5 w-5"
                                style={{ color: "white" }}
                            />
                            Liste de courses &nbsp;
                        </Button>
                        <Favorite recipe={recipe} />
                    </div>
                    <img src={recipe.img} alt="" width="400" />
                    <div className="flex items-center">
                        <ClockIcon className="self-start w-5" />
                        &nbsp;&nbsp;<b>{recipe.duration}</b> min
                    </div>
                    <p className="">{recipe.description}</p>
                    <div>
                        {recipe.ingredients.map((ingredient) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="border-2 border-b-rose-500 w-1/2 p-5">
                                {ingredient.name} - {ingredient.quantity}{" "}
                                {ingredient.unit}
                            </div>
                        ))}
                    </div>
                    
                    <Comment recipe={recipe} />
                </div>
            </section>

            <>
                {isLoading && (
                    <div className="loader-overlay">
                        <div className="loader"></div>
                    </div>
                )}
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={`Liste de courses  ${recipe?.title}`}
                    shoppingListText={shoppingListText}
                    buttonsToShow={["email", "copy", "socialMedia"]}
                >
                    <ul>
                        {shoppingListItems.map((ingredient, index) => (
                            <li key={index}>
                                {index === 0
                                    ? ingredient.trim()
                                    : `- ${ingredient.trim()}`}
                            </li>
                        ))}
                    </ul>
                </Modal>
            </>
        </>
    );
}

export default RecipeDetail;
