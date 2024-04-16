import "../App.css";
import {
    ClockIcon,
    LightBulbIcon,
    ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Comment from "../components/RecipeComment";
import { useEffect, useState } from "react";
import Favorite from "../components/Favorite";
import "../css/Loader.css";
import SearchBarSection from "../components/SearchBarSection";
import { getRecommendation } from "../api/recipe";
import Loading from "../components/Loading";
import Card from "../components/Card";
import DefaultLayout from "../layouts/DefaultLayout";

function RecipeDetail() {
    const [showModal, setShowModal] = useState(false);
    const [showModalCalories, setShowModalCalories] = useState(false);

    const [shoppingListText, setShoppingListText] = useState("");
    const [calories, setCalories] = useState("");

    const [counter, setCounter] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const increaseCounter = () => {
        const newCounter = counter + 1;
        generateShoppingList();
        setCounter(newCounter);
    };

    const decreaseCounter = () => {
        const newCounter = Math.max(1, counter - 1);
        generateShoppingList();
        setCounter(newCounter);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const recipe = location.state ? location.state.recipe : null;

    const generateShoppingList = () => {
        setIsLoading(true);
        const ingredientsText = recipe.ingredients
            .map((ing) => `${ing.quantity} ${ing.unit} ${ing.name}`)
            .join(", ");

        fetch("https://cuisineconnect-9ffq.onrender.com/list/generate", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shoppingList: ingredientsText,
                counter: counter,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
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

    const calculCalorique = () => {
        setIsLoading(true);
        const ingredientsList = recipe.ingredients.map((ing) => ing.name);

        fetch("https://cuisineconnect-9ffq.onrender.com/search/caloric", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipeName: recipe.title,
                ingredients: ingredientsList,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setCalories(data.estimation);
                setShowModalCalories(true);
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

    useEffect(() => {
        if (!recipe) {
            navigate("/");
        }
        const fetchRecommendations = async () => {
            const recommendations = await getRecommendation(recipe._id);
            setRecommendations(recommendations);
        };
        fetchRecommendations();
    }, []);

    return (
        <DefaultLayout>
            <div className="bg-gray-100 overflow-x-hidden">
                <SearchBarSection isTall={false} initialValue={recipe.title} />
                <section className="w-full mx-auto bg-white p-16 my-16 max-w-4xl">
                    <div className="flex flex-col gap-10">
                        <h1 className="text-4xl font-bold">{recipe.title}</h1>{" "}
                        <div className="flex justify-between">
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
                            <Button
                                onClick={calculCalorique}
                                className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
                            >
                                <ArrowTrendingUpIcon
                                    className="h-5 w-5"
                                    style={{ color: "white" }}
                                />
                                Nombre de calories &nbsp;
                            </Button>
                            <Favorite recipe={recipe} />
                        </div>
                        <img
                            src={recipe.img}
                            alt=""
                            className="w-full h-64 object-cover"
                        />
                        <div className="flex items-center gap-1">
                            <ClockIcon className="self-start w-5 mt-0.5 text-rose-600" />
                            <strong>{recipe.duration}</strong> min
                        </div>
                        <p className="">{recipe.description}</p>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                // liste à puce
                                <li
                                    key={ingredient.name}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 bg-rose-600 rounded-full mr-1"></div>
                                    <strong>{ingredient.name}</strong> -{" "}
                                    {ingredient.quantity} {ingredient.unit}
                                </li>
                            ))}
                        </ul>
                        <Comment recipe={recipe} />
                    </div>
                </section>
                {!recommendations && (
                    <p> Aucune recommendation n`a été trouvé</p>
                )}
                {recommendations && recommendations.length === 0 ? (
                    <Loading />
                ) : (
                    <div className="flex flex-col items-center mx-auto max-w-5xl my-16">
                        <h1 className="text-xl font-semibold text-center mb-12">
                            Recommandations de recettes similaires
                        </h1>
                        <div className="flex justify-between gap-5">
                            {recommendations.map((recipe) => (
                                <Card key={recipe._id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                )}

                <div>
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
                        increaseCounter={increaseCounter}
                        decreaseCounter={decreaseCounter}
                        counter={counter}
                    ></Modal>

                    <Modal
                        isOpen={showModalCalories}
                        onClose={() => setShowModalCalories(false)}
                        title={`Nombre de calories pour ${recipe?.title}`}
                        caloriesInfo={calories}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
}

export default RecipeDetail;
