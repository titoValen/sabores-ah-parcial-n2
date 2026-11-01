import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Section = lazy(() => import("../pages/Section"));
const DishDetail = lazy(() => import("../pages/DishDetail"));
const DishForm = lazy(() => import("../pages/DishForm"));
const Chefs = lazy(() => import("../pages/Chefs"));
const ChefForm = lazy(() => import("../pages/ChefForm"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sections/:slug" element={<Section />} />
      <Route path="/dishes/new" element={<DishForm />} />
      <Route path="/dishes/:id" element={<DishDetail />} />
      <Route path="/dishes/:id/edit" element={<DishForm />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/chefs/new" element={<ChefForm />} />
      <Route path="/chefs/:id/edit" element={<ChefForm />} />
      <Route path="*" element={<ErrorPage message="Página no encontrada" />} />
    </Routes>
  );
}
