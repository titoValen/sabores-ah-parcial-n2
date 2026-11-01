import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDish, getDishById } from "../services/dishes.services";

const priceFormatter = new Intl.NumberFormat("es-AR");

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getDishById(id)
      .then((loadedDish) => {
        setDish(loadedDish);
        setState("ready");
      })
      .catch((error) => {
        setMessage(error.message);
        setState("error");
      });
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar "${dish.name}" de la carta? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setMessage("Eliminando plato...");

    try {
      await deleteDish(id);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
      setIsDeleting(false);
    }
  }

  if (state === "loading") {
    return (
      <main className="page-shell">
        <p className="empty-state">Cargando plato...</p>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="page-shell">
        <p className="empty-state">{message}</p>
        <Link className="button-secondary" to="/">
          Volver al menú
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <Link className="back-link" to="/">
        &larr; Volver al menú
      </Link>
      <article className="dish-detail">
        <img src={dish.image} alt={dish.name} />
        <div className="dish-detail-content">
          <p className="eyebrow">
            {dish.section} / {dish.typeOfDish}
          </p>
          <h1>{dish.name}</h1>
          <p className="detail-description">{dish.description}</p>
          <p className="detail-price">
            ${priceFormatter.format(Number(dish.price))}
          </p>
          <p className="vegetarian">
            {dish.vegetarian ? "Opción vegetariana" : "Preparación de la casa"}
          </p>
          {message && <p className="form-message is-error">{message}</p>}
          <div className="dish-actions">
            <Link className="button-primary" to={`/dishes/${dish._id}/edit`}>
              Editar plato
            </Link>
            <button
              className="button-danger"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar plato"}
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
