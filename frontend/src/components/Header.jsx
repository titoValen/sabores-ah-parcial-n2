import { Link } from "react-router-dom";
import IconChefs from "../assets/chef.svg";

const sections = [
  { id: "entradas", name: "Entradas" },
  { id: "mains", name: "Platos principales" },
  { id: "pastas", name: "Pastas" },
  { id: "postres", name: "Postres" },
  { id: "bebidas", name: "Bebidas" },
];

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">Sabores</Link>
      <nav className="section-nav" aria-label="Secciones del menú">
        {sections.map((section) => (
          <Link key={section.id} to={`/sections/${section.id}`}>
            {section.name}
          </Link>
        ))}
        <Link className="nav-chefs" to="/chefs">
          <img className="chef-icon" src={IconChefs} alt="Ir a chefs" width="18" height="18" />
        </Link>
      </nav>
    </header>
  );
}
