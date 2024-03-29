import { ToastContainer, toast } from "react-toastify";
import {
    EnvelopeOpenIcon,
    DocumentIcon,
    ShareIcon,
    UserPlusIcon,
    UserMinusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import "../css/Modal.css";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    shoppingListText,
    counter,
    increaseCounter,
    decreaseCounter,
    buttonsToShow = [],
}) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="w-128 bg-white rounded-md shadow-md p-10 relative">
                <XMarkIcon
                    className="h-8 w-8 text-rose-600 cursor-pointer absolute top-3 right-3 bg-gray-50 rounded-full p-1 hover:bg-gray-200"
                    onClick={onClose}
                />

                <h3 className="text-center text-md font-semibold text-gray-800 mt-5 mb-12">
                    {title}
                </h3>
                <div className="flex justify-between items-center mb-5">
                    {buttonsToShow.includes("email") && (
                        <div className="flex justify-between rounded-md w-52 border border-rose-600 overflow-hidden">
                            <UserMinusIcon
                                onClick={() => counter > 1 && decreaseCounter()}
                                className={`w-11 text-rose-600 p-2 px-3 cursor-pointer hover:bg-rose-200 border-r border-rose-600 bg-rose-50
                            ${
                                counter > 1
                                    ? "text-rose-600 cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                            />
                            <h1 className="font-bold bg-white p-2 h-full text-center">
                                {counter}{" "}
                                <span className="text-sm font-normal ml-1">
                                    {counter > 1 ? "personnes" : "personne"}
                                </span>
                            </h1>
                            <UserPlusIcon
                                onClick={increaseCounter}
                                className="w-11 text-rose-600 p-2 px-3 cursor-pointer hover:bg-rose-200 border-l border-rose-600 bg-rose-50"
                            />
                        </div>
                    )}
                </div>
                <ul className="my-10">
                    {shoppingListText
                        .replace(/-/g, "")
                        .split("\n")
                        .map((ingredient) => (
                            <li
                                key={ingredient}
                                className="flex items-center gap-2 text-gray-800 font-normal my-2"
                            >
                                <div className="w-2 h-2 bg-rose-600 rounded-full mr-1"></div>
                                {ingredient}
                            </li>
                        ))}
                </ul>

                <div className="flex justify-center mt-5 gap-5">
                    {buttonsToShow.includes("email") && (
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
                            className="text-white bg-rose-600 hover:bg-rose-700 p-3 rounded text-sm flex items-center gap-2 hover:bg-rose-700 flex justify-center w-1/3"
                        >
                            <EnvelopeOpenIcon className="w-5 h-5" />
                            Envoyer
                        </Button>
                    )}
                    {buttonsToShow.includes("copy") && (
                        <Button
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(shoppingListText)
                                    .then(
                                        () => {
                                            toast(
                                                "Liste de courses copiée dans le presse-papier !",
                                                {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    color: "red",
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",
                                                    style: {
                                                        backgroundColor:
                                                            "#22c55e",
                                                        color: "white",
                                                    },
                                                }
                                            );
                                        },
                                        () => {
                                            toast(
                                                "Erreur lors de la copie dans le presse-papier",
                                                {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    color: "red",
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",
                                                    style: {
                                                        backgroundColor:
                                                            "#E11D48",
                                                        color: "white",
                                                    },
                                                }
                                            );
                                        }
                                    );
                            }}
                            className="button text-white bg-green-500 hover:bg-green-600 p-4 rounded text-sm flex items-center gap-2 flex justify-center w-1/3"
                        >
                            <DocumentIcon className="h-5 w-5" />
                            Copier
                        </Button>
                    )}
                    {buttonsToShow.includes("socialMedia") && (
                        <Button
                            onClick={() => {
                                const tweetText = encodeURIComponent(
                                    "Découvrez ma liste de courses ! " +
                                        shoppingListText
                                );
                                const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}`;
                                window.open(twitterLink, "_blank");
                            }}
                            className="button text-white bg-blue-800 hover:bg-blue-600 p-4 rounded text-sm flex items-center gap-2 flex justify-center w-1/3"
                        >
                            <ShareIcon className="h-5 w-5" />
                            Partager
                        </Button>
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                progressStyle={{ background: "white" }}
            />
        </div>
    );
}
