import Button from "../components/Button.jsx";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="h-20 flex items-center justify-around">
        <div><NavLink to="/">Logo</NavLink></div>
        <nav className="flex gap-5">
          <NavLink to="/recipes/search">
            <Button>Se connecter</Button>
          </NavLink>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}
