import {
    StarIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";
import Button from "./Button";
import { addComment } from "../api/recipe";
import { useUser } from "../hooks/useUser";



import { useState } from "react";


export default function Comment({ recipe }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { user } = useUser();


    const numberOfStars = 5;

    const stars = [];
    for (let i = 1; i <= numberOfStars; i++) {
        stars.push(
            <span key={i} onClick={() => setRating(i)}>
                {i <= rating ? <StarIconFilled className="px-1 text-yellow-500 w-10" /> : <StarIcon className="px-1 text-yellow-500 w-10" />}
            </span>
        );
    }

    const addReview = async (e) => {
        e.preventDefault();
        console.log('Commentaire et note envoyés:', { comment, rating });
        addComment(recipe._id, comment, rating)
            .then((response) => {
                if (response.status === 201) {
                    console.log("Commentaire ajouté avec succès");
                    setComment("");
                    setRating(0);
                    alert("Merci pour votre commentaire")
                } else if (response.status === 409) {
                    console.log("Commentaire déjà existant");
                    alert("Vous avez déjà commenté cette recette");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du commentaire :", error);
            }
            )
            ;

    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const isButtonDisabled = comment.trim() === "" || rating === 0;




    return (
        <>
            {user && (
                <Form
                    method="POST"
                    className="flex flex-col gap-5"
                    onSubmit={addReview}
                >
                    <textarea
                        className="border-2 border-black p-5"
                        name="comment"
                        id="comment"
                        cols="50"
                        rows="4"
                        value={comment}
                        placeholder="Écrire un commentaire..."
                        onChange={handleCommentChange}
                    ></textarea>
                    <p className="my-10 flex items-center">
                        Noter la recette &nbsp;
                        {stars}
                    </p>
                    {!isButtonDisabled && (
                        <Button backgroundColor="#DD1155" type="submit" >
                            Envoyer
                        </Button>
                    )}

                </Form>
            )}

        </>
    )
}