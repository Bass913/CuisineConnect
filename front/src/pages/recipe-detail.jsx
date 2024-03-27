import "../App.css";
import {
    StarIcon,
    ClockIcon,
    DocumentIcon,
    EnvelopeOpenIcon,
    ShareIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";

import { Form, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useEffect, useState } from "react";

function RecipeDetail() {
    const [showModal, setShowModal] = useState(false);
    const [shoppingListText, setShoppingListText] = useState("");

    const numberOfStars = 5;
    const navigate = useNavigate();
    const location = useLocation();
    const recipe = location.state ? location.state.recipe : null;
    const generateShoppingList = () => {
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
                setShoppingListText(data.response);

                setShowModal(true);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération de la liste de courses : ",
                    error
                );
            });
    };

    const shoppingListItems = shoppingListText
        .split("\n")
        .map((item, index) => <li key={index}>{item}</li>);
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
        stars.push(<StarIcon key={i} className="px-1 text-yellow-500 w-10" />);
    }
    return (
        <>
            <SearchBar />
            <section className="w-1/2 mt-28 mx-auto">
                <div className="flex flex-col gap-10">
                    <h1 className="text-4xl font-bold">{recipe.title}</h1> <div>
                        <Button
                            backgroundColor="rgb(221, 17, 85)"
                            onClick={generateShoppingList}
                        >
                            Générer la liste de courses &nbsp;
                            <LightBulbIcon
                                className="h-5 w-5"
                                style={{ color: "white" }}
                            />
                        </Button>
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
                    <Form>
                        <textarea
                            className="border-2 border-black p-5"
                            name=""
                            id=""
                            cols="50"
                            rows="7"
                            placeholder="Écrire un commentaire..."
                        ></textarea>
                        <p className="my-10 flex items-center">
                            Noter la recette &nbsp;
                            {stars}
                        </p>
                        <Button backgroundColor="#DD1155" type="submit">
                            Envoyer
                        </Button>
                    </Form>
                </div>
            </section>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                        <h1
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "black",
                                fontSize: "24px",
                            }}
                        >
                            Recette de {recipe.title}
                        </h1>
                        <br></br>
                        <ul>
                            {shoppingListItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <div className="modal-actions">
                            <Button
                                onClick={() => {
                                    const emailSubject = encodeURIComponent(
                                        "Ma liste de courses"
                                    );
                                    const emailBody =
                                        encodeURIComponent(shoppingListText);
                                    const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
                                    window.location.href = mailtoLink;
                                }}
                            >
                                <EnvelopeOpenIcon className="h-5 w-5" />
                                &nbsp; Envoyer par Email
                            </Button>
                            <Button
                                backgroundColor="rgb(221, 17, 85)"
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(shoppingListText)
                                        .then(
                                            () => {
                                                alert(
                                                    "Liste de courses copiée dans le presse-papier !"
                                                );
                                            },
                                            () => {
                                                alert(
                                                    "Erreur lors de la copie dans le presse-papier."
                                                );
                                            }
                                        );
                                }}
                            >
                                <DocumentIcon className="h-5 w-5" />
                                &nbsp; Copier
                            </Button>
                            <Button
                                backgroundColor="#4CAF50"
                                onClick={() => {
                                    const tweetText = encodeURIComponent(
                                        "Découvrez ma liste de courses ! " +
                                            shoppingListText
                                    );
                                    const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}`;
                                    window.open(twitterLink, "_blank");
                                }}
                            >
                                <ShareIcon className="h-5 w-5" />
                                &nbsp; Partager
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RecipeDetail;
