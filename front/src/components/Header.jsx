import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { UserCircleIcon } from "lucide-react";
import { useUser } from "../hooks/useUser";

export default function Header({ user }) {
  const { logout } = useUser();
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate(0);
  };
  return (
    <header className="h-20 flex items-center justify-between px-5 mx-auto fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 dark:border-b border-gray-200">
      <div>
        <NavLink to="/">
          <img src="/logo.svg" alt="logo" className="h-10" />
        </NavLink>
      </div>
      {user ? (
        <div className="flex items-center gap-5">
          <nav className="flex gap-5">
            <NavLink to="/profile">
              <Button className="hover:bg-gray-100 p-4 rounded text-sm flex items-center gap-2 text-gray-800">
                <UserCircleIcon className="w-5 h-5" />
                {user.username}
              </Button>
            </NavLink>
            <NavLink to="/auth/login">
              <Button
                className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700"
                onClick={() => onClick()}
              >
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                Se déconnecter
              </Button>
            </NavLink>
          </nav>
        </div>
      ) : (
        <nav className="flex gap-5">
          <NavLink to="/auth/login">
            <Button className="text-white bg-rose-600 hover:bg-rose-600 p-4 rounded text-sm flex items-center gap-2 hover:bg-rose-700">
              <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
              Se connecter
            </Button>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
