import Button from "./Button";
import {
    EnvelopeOpenIcon,
    DocumentIcon,
    ShareIcon,
} from "@heroicons/react/24/outline";
import "../css/Modal.css";
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    shoppingListText,
    buttonsToShow = [],
}) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
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
                    {title}
                </h1>
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
                            className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
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
                            className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
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
                            className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
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
