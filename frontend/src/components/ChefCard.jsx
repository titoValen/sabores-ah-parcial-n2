import { Link } from "react-router-dom";

export default function ChefCard({ chef, onDelete }) {
  return (
    <article className="chef-card">
      <img src={chef.photo} alt={chef.name} loading="lazy" />
      <div className="chef-card-content">
        <h3>{chef.name}</h3>
        <p>{chef.description}</p>
        <div className="dish-footer">
          <div className="dish-card-links">
            <Link to={`/chefs/${chef._id}/edit`}>Editar</Link>
            <button
              className="link-danger"
              type="button"
              onClick={() => onDelete(chef)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
