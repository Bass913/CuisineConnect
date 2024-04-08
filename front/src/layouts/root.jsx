import { useEffect } from "react";
import Chatbot from "../components/ChatBot.jsx";
import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Navbar() {
  const { getUserInfo, user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      getUserInfo();
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between h-lvh">
      <Header user={user} />
      <main>
        <Outlet />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}
