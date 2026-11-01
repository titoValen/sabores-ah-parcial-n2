import { Link } from "react-router-dom";

const priceFormatter = new Intl.NumberFormat("es-AR");

export default function DishCard({ dish, sectionLabel = dish.section }) {
  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} loading="lazy" />
      <div className="dish-card-content">
        <p className="dish-section">{sectionLabel}</p>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <div className="dish-footer">
          <strong>${priceFormatter.format(Number(dish.price))}</strong>
          <div className="dish-card-links">
            <Link to={`/dishes/${dish._id}`}>Ver detalle</Link>
            <Link to={`/dishes/${dish._id}/edit`}>Editar</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
