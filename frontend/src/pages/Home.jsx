import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDishes } from "../services/dishes.services";
import { sections } from "../constants/sections";
import "../style/home.css";

const priceFormatter = new Intl.NumberFormat("es-AR");

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getDishes()
      .then((loadedDishes) => {
        if (isMounted) setDishes(loadedDishes);
      })
      .catch((requestError) => {
        if (isMounted) setError(requestError.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">Restaurante Sabores</p>
        <h1>Un menú para disfrutar sin apuro.</h1>
        <p>Elegí una sección y descubrí nuestras preparaciones.</p>
      </section>

      <section className="section-grid" aria-label="Secciones del menú">
        {sections.map((section) => (
          <Link
            className="section-link"
            key={section.id}
            to={`/sections/${section.id}`}
          >
            <span>{section.name}</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        ))}
      </section>

      <section className="menu-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nuestra carta</p>
            <h2>Todos los platos</h2>
          </div>
          <div className="section-heading-actions">
            <span className="result-count">{dishes.length} platos</span>
            <Link className="button-primary" to="/dishes/new">
              Agregar plato
            </Link>
          </div>
        </div>

        {isLoading && <p className="empty-state">Cargando platos...</p>}
        {!isLoading && error && <p className="empty-state">{error}</p>}
        {!isLoading && !error && dishes.length === 0 && (
          <p className="empty-state">Todavía no hay platos cargados.</p>
        )}
        {!isLoading && !error && dishes.length > 0 && (
          <div className="dish-grid">
            {dishes.map((dish) => (
              <article className="dish-card" key={String(dish._id)}>
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <div className="dish-card-content">
                  <p className="dish-section">{dish.section}</p>
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-footer">
                    <strong>
                      ${priceFormatter.format(Number(dish.price))}
                    </strong>
                    <div className="dish-card-links">
                      <Link to={`/dishes/${dish._id}`}>Ver detalle</Link>
                      <Link to={`/dishes/${dish._id}/edit`}>Editar</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
