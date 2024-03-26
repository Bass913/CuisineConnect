import { useState } from "react";
import axios from "axios";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userMessageObj = { from: "user", text: userMessage };
    setMessages((prevMessages) => [...prevMessages, userMessageObj]);
    setUserMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/chat/chat-with-chef",
        { message: userMessage }
      );

      const chefResponseObj = { from: "chef", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, chefResponseObj]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
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
    padding: "10px",
    zIndex: "1000",
    transition: "bottom 0.3s",
  };

  const messageStyle = (isUser) => ({
    maxWidth: "80%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "20px",
    color: isUser ? "white" : "rgb(65, 65, 65)",
    backgroundColor: isUser ? "rgb(221, 17, 85)" : "white",
    marginLeft: isUser ? "auto" : "10px",
    marginRight: isUser ? "10px" : "auto",
    wordBreak: "break-word",
    marginBottom: "12px",
  });

  const headerStyle = {
    backgroundColor: "rgb(221, 17, 85)",
    color: "white",
    padding: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };

  return (
    <>
      {isChatOpen && (
        <div style={chatStyle}>
          <div style={headerStyle}> Auriez-vous une question? </div>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} style={messageStyle(msg.from === "user")}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div style={messageStyle(false)}>Chargement...</div>}
          </div>

          <form
            onSubmit={sendMessage}
            style={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            <div
              style={{
                width: "90%",
                height: "1px",
                backgroundColor: "#ccc",
                margin: "10px 0",
              }}
            ></div>

            <input
              type="text"
              disabled={isLoading}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Envoyer un message..."
              style={{
                width: "85%",
                backgroundColor: "#F9F4F3",
                marginBottom: "15px",
                outline: "none",
              }}
            />
            <button type="submit">
            <PaperAirplaneIcon className="mb-1 h-6 w-6 text-gray-500" />
            </button>
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
          backgroundColor: "rgb(221, 17, 85)",
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
