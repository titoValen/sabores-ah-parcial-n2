import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { sections } from "../constants/sections";
import {
  deleteDish,
  getDishById,
  createDish,
  updateDish,
} from "../services/dishes.services";
import { getChefs } from "../services/chefs.services";

const emptyDish = {
  name: "",
  description: "",
  price: "",
  image: "",
  section: "",
  typeOfDish: "",
  vegetarian: false,
  chefId: "",
};

export default function DishForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [dish, setDish] = useState(emptyDish);
  const [chefs, setChefs] = useState([]);
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const requests = [getChefs()];
    if (isEdit) requests.push(getDishById(id));

    Promise.all(requests)
      .then(([loadedChefs, loadedDish]) => {
        setChefs(loadedChefs);
        if (loadedDish) {
          setDish({
            name: loadedDish.name || "",
            description: loadedDish.description || "",
            price: loadedDish.price ?? "",
            image: loadedDish.image || "",
            section: loadedDish.section || "",
            typeOfDish: loadedDish.typeOfDish || "",
            vegetarian: Boolean(loadedDish.vegetarian),
            chefId: String(loadedDish.chefId || ""),
          });
        }
        setState("ready");
      })
      .catch((error) => {
        setMessage(error.message);
        setState("error");
      });
  }, [id, isEdit]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setDish((currentDish) => ({
      ...currentDish,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: dish.name.trim(),
      description: dish.description.trim(),
      price: Number(dish.price),
      image: dish.image.trim(),
      section: dish.section,
      typeOfDish: dish.typeOfDish.trim(),
      vegetarian: dish.vegetarian,
      chefId: dish.chefId,
    };

    if (
      !payload.name ||
      !payload.description ||
      !payload.image ||
      !payload.section ||
      !payload.typeOfDish ||
      !payload.chefId ||
      !Number.isFinite(payload.price)
    ) {
      setMessage("Completá todos los campos antes de guardar.");
      return;
    }

    setIsSaving(true);
    setMessage(isEdit ? "Guardando cambios..." : "Guardando plato...");

    try {
      if (isEdit) {
        await updateDish(id, payload);
        navigate(`/dishes/${id}`);
      } else {
        const result = await createDish(payload);
        navigate(`/dishes/${result._id}`);
      }
    } catch (error) {
      setMessage(error.message);
      setIsSaving(false);
    }
  }

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
        <p className="empty-state">Cargando formulario...</p>
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

  if (chefs.length === 0) {
    return (
      <main className="page-shell">
        <section className="intro compact-intro">
          <Link className="back-link" to="/">
            &larr; Volver al menú
          </Link>
          <p className="eyebrow">Cocina</p>
          <h1>{isEdit ? "Editar plato" : "Agregar un plato"}</h1>
        </section>
        <p className="empty-state">
          No hay chefs cargados. Primero necesitás al menos un chef para
          asociarlo al plato.
        </p>
        <Link className="button-primary" to="/chefs/new">
          Agregar chef
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="intro compact-intro">
        <Link className="back-link" to={isEdit ? `/dishes/${id}` : "/"}>
          &larr; {isEdit ? "Volver al plato" : "Volver al menú"}
        </Link>
        <p className="eyebrow">Cocina</p>
        <h1>{isEdit ? "Editar plato" : "Agregar un plato"}</h1>
        <p>
          {isEdit
            ? `Actualizá los datos de ${dish.name}.`
            : "Completá los datos para sumarlo a la carta."}
        </p>
      </section>

      <form className="dish-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre</span>
            <input
              name="name"
              type="text"
              required
              maxLength="120"
              value={dish.name}
              onChange={handleChange}
              placeholder="Ej. Ravioles de ricota"
            />
          </label>
          <label className="form-field">
            <span>Precio</span>
            <input
              name="price"
              type="number"
              required
              min="0"
              step="1"
              value={dish.price}
              onChange={handleChange}
              placeholder="8500"
            />
          </label>
          <label className="form-field form-field-full">
            <span>Descripción</span>
            <textarea
              name="description"
              required
              rows="4"
              maxLength="500"
              value={dish.description}
              onChange={handleChange}
              placeholder="Breve descripción del plato"
            />
          </label>
          <label className="form-field form-field-full">
            <span>URL de imagen</span>
            <input
              name="image"
              type="url"
              required
              value={dish.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>
          <label className="form-field">
            <span>Sección</span>
            <select
              name="section"
              required
              value={dish.section}
              onChange={handleChange}
            >
              <option value="" disabled>
                Elegí una sección
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Tipo de plato</span>
            <input
              name="typeOfDish"
              type="text"
              required
              maxLength="80"
              value={dish.typeOfDish}
              onChange={handleChange}
              placeholder="Ej. plato principal"
            />
          </label>
          <label className="form-field">
            <span>Chef</span>
            <select
              name="chefId"
              required
              value={dish.chefId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Elegí un chef
              </option>
              {chefs.map((chef) => (
                <option key={chef._id} value={chef._id}>
                  {chef.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field form-checkbox">
            <input
              name="vegetarian"
              type="checkbox"
              checked={dish.vegetarian}
              onChange={handleChange}
            />
            <span>Opción vegetariana</span>
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
              {isDeleting ? "Eliminando..." : "Eliminar plato"}
            </button>
          )}
          <div className="form-actions-end">
            <Link
              className="button-secondary"
              to={isEdit ? `/dishes/${id}` : "/"}
            >
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
                  : "Guardar plato"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
