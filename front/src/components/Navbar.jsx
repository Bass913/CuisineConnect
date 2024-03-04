import Button from "./Button.jsx";

export default function Navbar() {
  return (
    <div className="h-20 flex items-center justify-around">
      <div>Logo</div>
      <ul className="flex gap-5">
        <li>
          <Button>Se connecter</Button>
        </li>
      </ul>
    </div>
  );
}
