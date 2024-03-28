import {
    StarIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";
import Button from "./Button";
import { addComment } from "../api/recipe";
import { useUser } from "../hooks/useUser";
import { getAllComments } from "../api/recipe";



import { useEffect, useState } from "react";


export default function Comment({ recipe }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        getAllComments(recipe._id)
            .then((comments) => {
                setAllComments(comments);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des commentaires :", error);
            });
    }, [recipe._id]);

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
                <>
                    <Form
                        method="POST"
                        className="flex flex-col gap-5"
                        onSubmit={addReview}
                    >
                        <textarea
                            className="border-2 border-black p-4"
                            name="comment"
                            id="comment"
                            cols="50"
                            rows="4"
                            value={comment}
                            placeholder="Écrire un commentaire..."
                            onChange={handleCommentChange}
                        ></textarea>
                        <p className="flex items-center">
                            Noter la recette &nbsp;
                            {stars}
                        </p>
                        {!isButtonDisabled && (

                            <Button className="text-white bg-rose-600 hover:bg-rose-600 py-3 rounded text-sm w-36" type="submit" >
                                Envoyer
                            </Button>
                        )}

                    </Form>
                    <div>
                        <h2>Commentaires</h2>
                        {allComments.map((comment) => (
                            <div key={comment.id}>
                                <h3>{comment.username}</h3>
                                <p>{comment.comment}</p>
                                <p>{comment.createdAT}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    )
}