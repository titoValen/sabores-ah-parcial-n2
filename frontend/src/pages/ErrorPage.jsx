import { Link } from "react-router-dom";

export default function ErrorPage({ message = "Ocurrió un error" }) {
  return (
    <main className="error-page">
      <p className="eyebrow">Sabores</p>
      <h1>{message}</h1>
      <Link className="button-link" to="/">
        Volver al menú
      </Link>
    </main>
  );
}
