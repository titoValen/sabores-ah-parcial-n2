import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createChef,
  deleteChef,
  getChefById,
  updateChef,
} from "../services/chefs.services";

const emptyChef = { name: "", photo: "", description: "" };

export default function ChefForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [chef, setChef] = useState(emptyChef);
  const [state, setState] = useState(isEdit ? "loading" : "ready");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    getChefById(id)
      .then((loadedChef) => {
        setChef({
          name: loadedChef.name || "",
          photo: loadedChef.photo || "",
          description: loadedChef.description || "",
        });
        setState("ready");
      })
      .catch((error) => {
        setMessage(error.message);
        setState("error");
      });
  }, [id, isEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setChef((currentChef) => ({ ...currentChef, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: chef.name.trim(),
      photo: chef.photo.trim(),
      description: chef.description.trim(),
    };

    if (!payload.name || !payload.photo || !payload.description) {
      setMessage("Completá todos los campos antes de guardar.");
      return;
    }

    setIsSaving(true);
    setMessage(isEdit ? "Guardando cambios..." : "Guardando chef...");

    try {
      if (isEdit) {
        await updateChef(id, payload);
      } else {
        await createChef(payload);
      }
      navigate("/chefs");
    } catch (error) {
      setMessage(error.message);
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar a "${chef.name}" del equipo? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setMessage("Eliminando chef...");
    try {
      await deleteChef(id);
      navigate("/chefs");
    } catch (error) {
      setMessage(error.message);
      setIsDeleting(false);
    }
  }

  if (state === "loading") {
    return (
      <main className="page-shell">
        <p className="empty-state">Cargando chef...</p>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="page-shell">
        <p className="empty-state">{message}</p>
        <Link className="button-secondary" to="/chefs">
          Volver a chefs
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="intro compact-intro">
        <Link className="back-link" to="/chefs">
          &larr; Volver a chefs
        </Link>
        <p className="eyebrow">Equipo</p>
        <h1>{isEdit ? "Editar chef" : "Agregar un chef"}</h1>
        <p>
          {isEdit
            ? `Actualizá los datos de ${chef.name}.`
            : "Completá los datos para sumarlo al equipo de cocina."}
        </p>
      </section>

      <form className="dish-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field form-field-full">
            <span>Nombre</span>
            <input
              name="name"
              type="text"
              required
              maxLength="120"
              value={chef.name}
              onChange={handleChange}
              placeholder="Ej. Martín Gómez"
            />
          </label>
          <label className="form-field form-field-full">
            <span>URL de foto</span>
            <input
              name="photo"
              type="url"
              required
              value={chef.photo}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>
          <label className="form-field form-field-full">
            <span>Descripción</span>
            <textarea
              name="description"
              required
              rows="4"
              maxLength="500"
              value={chef.description}
              onChange={handleChange}
              placeholder="Breve bio del chef"
            />
          </label>
        </div>

        {message && <p className="form-message is-error">{message}</p>}
        <div className="form-actions">
          {isEdit && (
            <button
              className="button-danger"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
            >
              {isDeleting ? "Eliminando..." : "Eliminar chef"}
            </button>
          )}
          <div className="form-actions-end">
            <Link className="button-secondary" to="/chefs">
              Cancelar
            </Link>
            <button
              className="button-primary"
              type="submit"
              disabled={isSaving || isDeleting}
            >
              {isSaving
                ? "Guardando..."
                : isEdit
                  ? "Guardar cambios"
                  : "Guardar chef"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
