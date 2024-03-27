import { useEffect } from "react";
import Chatbot from "../components/ChatBot.jsx";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Navbar() {
  const { getUserInfo, user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };
    fetchData();
  }, []);

	return (
		<>
			<Header user={user} />
			<main>
				<Outlet />
				<Chatbot />
			</main>
			<Footer />
		</>
	);
}
