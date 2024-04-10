import { StarIcon } from "@heroicons/react/24/outline";
import {
    StarIcon as StarIconFilled,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";
import Button from "./Button";
import { addComment } from "../api/recipe";
import { useUser } from "../hooks/useUser";
import { getAllComments } from "../api/recipe";
import { ToastContainer, toast } from "react-toastify";

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
                console.error(
                    "Erreur lors de la récupération des commentaires :",
                    error
                );
            });
    }, [setAllComments, recipe._id]);

    const { user } = useUser();

    const numberOfStars = 5;

    const stars = [];
    for (let i = 1; i <= numberOfStars; i++) {
        stars.push(
            <span
                key={i}
                onClick={() => setRating(i)}
                onMouseEnter={() => {
                    const filledStars =
                        document.querySelectorAll(".filled-star");
                    filledStars.forEach((star, index) => {
                        if (index < i) {
                            star.classList.add("text-yellow-500");
                        } else {
                            star.classList.remove("text-yellow-500");
                        }
                    });
                }}
                onMouseLeave={() => {
                    const filledStars =
                        document.querySelectorAll(".filled-star");
                    filledStars.forEach((star) => {
                        star.classList.remove("text-yellow-500");
                    });
                }}
            >
                {i <= rating ? (
                    <StarIconFilled className="px-1 filled-star w-10 hover:cursor-pointer" />
                ) : (
                    <StarIcon className="px-1 filled-star w-10 hover:cursor-pointer" />
                )}
            </span>
        );
    }

    const addReview = async (e) => {
        e.preventDefault();
        addComment(recipe._id, comment, rating)
            .then((response) => {
                if (response.status === 201) {
                    setComment("");
                    setRating(0);
                    const newComment = {
                        id: Math.random().toString(36).substr(2, 9),
                        comment: comment,
                        rating: rating,
                        username: user.username,
                        createdAt: new Date().toISOString(),
                    };
                    setAllComments((prevComments) => [
                        newComment,
                        ...prevComments,
                    ]);
                    toast.success("Merci pour votre commentaire", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (response.status === 409) {
                    toast.error("Vous avez déjà commenté cette recette");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du commentaire :", error);
            });
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const isButtonDisabled = comment.trim() === "" || rating === 0;

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
    }

    return (
        <>
            {user && (
                <>
                    <Form
                        method="POST"
                        className="flex flex-col gap-5 border border-gray-300 p-5 rounded bg-gray-50"
                        onSubmit={addReview}
                    >
                        <h3 className="text-lg font-semibold">
                            Laisser un commentaire
                        </h3>
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
                            <Button
                                className="text-white bg-rose-600 hover:bg-rose-600 py-3 rounded text-sm w-36"
                                type="submit"
                            >
                                Envoyer
                            </Button>
                        )}
                    </Form>
                </>
            )}
            <div className="mt-16">
                <h2 className="mb-10 text-2xl font-semibold leading-tight flex gap-5">
                    Commentaires
                    <ChatBubbleBottomCenterTextIcon className=" text-rose-500 w-8 p-1" />
                </h2>
                {allComments.map((comment) => (
                    <div
                        key={comment.id}
                        className="border-b-2 border-gray-300 mb-6 pb-4"
                        name="comment168253"
                        id="comment168253"
                    >
                        <p className=" text-gray-900 mb-2">{comment.comment}</p>
                        <div className="inline-block font-bold text-gray-800 text-xs uppercase tracking-widest mb-2 mr-2">
                            {comment.username}
                            <span className="font-normal text-gray-800 mx-2">
                                •
                            </span>
                        </div>
                        <div className="inline-block font-bold text-gray-800 text-xs uppercase tracking-widest mb-2">
                            {formatDate(comment.createdAt)}
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    );
}
