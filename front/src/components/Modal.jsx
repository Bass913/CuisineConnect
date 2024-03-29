import {
    EnvelopeOpenIcon,
    DocumentIcon,
    ShareIcon,
    UserPlusIcon,
    UserMinusIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import "../css/Modal.css";

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
            <div className="modal-content">
                <span className="close " onClick={onClose}>
                    &times;
                </span>

                <h3
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "15px",
                        paddingTop: "30px",
                    }}
                >
                    {title}
                </h3>
                {buttonsToShow.includes("email") && (
                    <div className="pt-4 flex justify-center gap-3">
                        <UserMinusIcon
                            onClick={() => counter > 1 && decreaseCounter()}
                            className={`h-6 w-6 ${
                                counter > 1
                                    ? "text-rose-600 cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                        />

                        <h1 className="font-bold">{counter}</h1>
                        <UserPlusIcon
                            onClick={increaseCounter}
                            className="h-6 w-6 text-rose-600"
                        />
                    </div>
                )}

                <br />

                <ul>{children}</ul>
                <div className="modal-actions">
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
                            className="button test text-white bg-rose-600 hover:bg-rose-600 p-3 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
                        >
                            <EnvelopeOpenIcon className="w-5 h-5" />
                            Envoyer par Email
                        </Button>
                    )}
                    {buttonsToShow.includes("copy") && (
                        <Button
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
                            className="button text-white bg-green-500 hover:bg-green-600 p-4 rounded text-sm flex items-center gap-2"
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
                            className="button text-white bg-blue-800 hover:bg-blue-600 p-4 rounded text-sm flex items-center gap-2"
                        >
                            <ShareIcon className="h-5 w-5" />
                            Partager
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
