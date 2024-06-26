import { useState, useRef, useEffect } from "react";
import {
    ChatBubbleOvalLeftEllipsisIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function ChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const messagesContainerRef = useRef(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        const userMessageObj = { from: "user", text: userMessage };
        setMessages((prevMessages) => [...prevMessages, userMessageObj]);
        setUserMessage("");
        const url =
            "https://cuisineconnect-9ffq.onrender.com/chat/chat-with-chef";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessageObj.text }),
            });
            const reader = response.body.getReader();
            let decoder = new TextDecoder();

            reader.read().then(function processText({ done, value }) {
                if (done) {
                    return;
                }
                const chunk = decoder.decode(value, { stream: true });
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    if (
                        newMessages.length > 0 &&
                        newMessages[newMessages.length - 1].from === "chef"
                    ) {
                        newMessages[newMessages.length - 1].text += chunk;
                    } else {
                        newMessages.push({ from: "chef", text: chunk });
                    }
                    return newMessages;
                });
                return reader.read().then(processText);
            });
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: "chef", text: "Une erreur est survenue." },
            ]);
        }
    };

    const chatStyle = {
        position: "fixed",
        bottom: isChatOpen ? "80px" : "-500px",
        right: "20px",
        width: "300px",
        height: "400px",
        backgroundColor: "#F9F4F3",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        zIndex: "1000",
        transition: "bottom 0.3s",
    };

    const messageStyle = (isUser) => ({
        maxWidth: "80%",
        width: "fit-content",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "10px",
        color: isUser ? "white" : "rgb(65, 65, 65)",
        backgroundColor: isUser ? "rgb(225, 29, 72)" : "white",
        marginLeft: isUser ? "auto" : "10px",
        marginRight: isUser ? "10px" : "auto",
        wordBreak: "break-word",
        marginBottom: "12px",
        fontSize: "0.9rem",
    });

    useEffect(() => {
        if (messagesContainerRef.current) {
            const { current: container } = messagesContainerRef;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {isChatOpen && (
                <div style={chatStyle} className="overflow-hidden">
                    <div className="bg-rose-600 text-white p-3">
                        {" "}
                        Auriez-vous une question?{" "}
                    </div>
                    <div
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                        ref={messagesContainerRef}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={messageStyle(msg.from === "user")}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={sendMessage}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        <div className="flex items-center justify-between relative border-t border-gray-500">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder="Envoyer un message..."
                                className="w-full border-none focus:outline-none text-sm text-gray-600 placeholder-gray-500 p-3 h-12 pr-10"
                            />
                            <button type="submit" className="absolute right-3">
                                <PaperAirplaneIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    backgroundColor: "rgb(225, 29, 72)",
                    color: "white",
                    borderRadius: "50%",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "1100",
                }}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
            </button>
        </>
    );
}
