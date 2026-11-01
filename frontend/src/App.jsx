import { Suspense } from "react";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Cargando...</p>}>
        <AppRoutes />
      </Suspense>
    </>
  );
}
