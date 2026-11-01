import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import { getSectionById } from "../constants/sections";
import { getDishes } from "../services/dishes.services";

export default function Section() {
  const { slug } = useParams();
  const section = getSectionById(slug);
  const [dishes, setDishes] = useState([]);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!section) {
      setState("error");
      setError("La sección no existe");
      return;
    }

    setState("loading");
    getDishes({ section: slug })
      .then((loadedDishes) => {
        setDishes(loadedDishes);
        setState("ready");
      })
      .catch((requestError) => {
        setError(requestError.message);
        setState("error");
      });
  }, [section, slug]);

  if (!section || state === "error") {
    return (
      <main className="page-shell">
        <Link className="back-link" to="/">
          &larr; Volver al menú
        </Link>
        <p className="empty-state">{error || "La sección no existe"}</p>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="intro compact-intro">
        <Link className="back-link" to="/">
          &larr; Volver al menú
        </Link>
        <p className="eyebrow">Sección seleccionada</p>
        <h1>{section.name}</h1>
        <p>Preparaciones elegidas de nuestra carta.</p>
      </section>

      {state === "loading" && <p className="empty-state">Cargando platos...</p>}
      {state === "ready" && dishes.length === 0 && (
        <p className="empty-state">No hay platos cargados en esta sección.</p>
      )}
      {state === "ready" && dishes.length > 0 && (
        <div className="dish-grid">
          {dishes.map((dish) => (
            <DishCard
              key={String(dish._id)}
              dish={dish}
              sectionLabel={dish.typeOfDish}
            />
          ))}
        </div>
      )}
    </main>
  );
}
