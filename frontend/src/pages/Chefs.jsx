import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChefCard from "../components/ChefCard";
import { deleteChef, getChefs } from "../services/chefs.services";

export default function Chefs() {
  const [chefs, setChefs] = useState([]);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    getChefs()
      .then((loadedChefs) => {
        setChefs(loadedChefs);
        setState("ready");
      })
      .catch((requestError) => {
        setError(requestError.message);
        setState("error");
      });
  }, [retryCount]);

  async function handleDelete(chef) {
    const confirmed = window.confirm(
      `¿Eliminar a "${chef.name}" del equipo? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    try {
      await deleteChef(chef._id);
      setChefs((currentChefs) =>
        currentChefs.filter((item) => item._id !== chef._id),
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="intro compact-intro">
        <Link className="back-link" to="/">
          &larr; Volver al menú
        </Link>
        <p className="eyebrow">Equipo</p>
        <h1>Nuestros chefs</h1>
        <p>Las personas detrás de cada preparación de la carta.</p>
      </section>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Cocina</p>
          <h2>Todos los chefs</h2>
        </div>
        <div className="section-heading-actions">
          <span className="result-count">{chefs.length} chefs</span>
          <Link className="button-primary" to="/chefs/new">
            Agregar chef
          </Link>
        </div>
      </div>

      {state === "loading" && <p className="empty-state">Cargando chefs...</p>}
      {state === "error" && (
        <div className="empty-state">
          <p>{error}</p>
          <button
            className="button-secondary"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Reintentar
          </button>
        </div>
      )}
      {state === "ready" && chefs.length === 0 && (
        <p className="empty-state">Todavía no hay chefs cargados.</p>
      )}
      {state === "ready" && chefs.length > 0 && (
        <div className="chef-grid">
          {chefs.map((chef) => (
            <ChefCard
              key={String(chef._id)}
              chef={chef}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
