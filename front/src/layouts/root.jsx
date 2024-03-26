import { useEffect } from "react";
import Button from "../components/Button.jsx";
import ChatBot from "../components/ChatBot.jsx";

import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { getUserInfo, user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };
    fetchData();
  }, [getUserInfo]);

  return (
    <>
      <header className="h-20 flex items-center justify-around">
        <div>
          <NavLink to="/">Logo</NavLink>
        </div>
        {user ? (
          <div className="flex items-center gap-5">
            <h1 className="text-lg font-bold">{user.username}</h1>
            <nav className="flex gap-5">
              <NavLink to="/auth/login">
                <Button>Se déconnecter</Button>
              </NavLink>
            </nav>
          </div>
        ) : (
          <nav className="flex gap-5">
            <NavLink to="/auth/login">
              <Button>Se connecter</Button>
            </NavLink>
          </nav>
        )}
      </header>
      <div>
        <Outlet />
      </div>
      <section>
        <ChatBot />
      </section>
      <footer className="mt-28 bg-rose-500 text-gray-50">
        <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row dark:divide-gray-400">
          {/* Vos éléments de pied de page ici */}
        </div>
      </footer>
    </>
  );
}
