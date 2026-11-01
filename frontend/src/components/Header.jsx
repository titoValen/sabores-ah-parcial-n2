import { Link, useLocation } from "react-router-dom";
import IconChefs from "../assets/chef.svg";
import { sections } from "../constants/sections";
import "../style/header.css";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        Sabores
      </Link>
      <nav className="section-nav" aria-label="Secciones del menú">
        {sections.map((section) => (
          <Link
            className={pathname === `/sections/${section.id}` ? "active" : ""}
            key={section.id}
            to={`/sections/${section.id}`}
          >
            {section.name}
          </Link>
        ))}
        <Link
          className={`nav-chefs ${pathname.startsWith("/chefs") ? "active" : ""}`}
          to="/chefs"
        >
          <img
            className="chef-icon"
            src={IconChefs}
            alt="Ir a chefs"
            width="18"
            height="18"
          />
        </Link>
      </nav>
    </header>
  );
}
