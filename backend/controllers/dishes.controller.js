import * as dishesService from "../services/dishes.service.js";
import * as chefsService from "../services/chefs.services.js";

const SECTIONS = [
  { id: "entradas", name: "Entradas" },
  { id: "mains", name: "Platos principales" },
  { id: "pastas", name: "Pastas" },
  { id: "postres", name: "Postres" },
  { id: "bebidas", name: "Bebidas" },
];

export async function renderDishes(req, res) {
  try {
    const dishes = await dishesService.getDishes();
    res.render("index", { sections: SECTIONS, dishes });
  } catch (error) {
    console.error("Error al renderizar los platos:", error);
    res.status(500).render("error", { message: "No se pudo cargar el menú" });
  }
}

export async function renderNewDish(req, res) {
  try {
    const chefs = await chefsService.getChefs();
    res.render("new-dish", { sections: SECTIONS, chefs });
  } catch (error) {
    console.error("Error al renderizar el formulario de plato:", error);
    res
      .status(500)
      .render("error", { message: "No se pudo cargar el formulario" });
  }
}

export async function renderEditDish(req, res) {
  try {
    const [dish, chefs] = await Promise.all([
      dishesService.getDishById(req.params.id),
      chefsService.getChefs(),
    ]);

    if (!dish)
      return res
        .status(404)
        .render("error", { message: "Plato no encontrado" });

    res.render("edit-dish", { sections: SECTIONS, chefs, dish });
  } catch (error) {
    console.error("Error al renderizar la edición del plato:", error);
    res.status(error.statusCode || 500).render("error", {
      message: error.message || "No se pudo cargar el formulario de edición",
    });
  }
}

export async function renderSection(req, res) {
  try {
    const { slug } = req.params;
    const section = SECTIONS.find((item) => item.id === slug);

    if (!section)
      return res
        .status(404)
        .render("error", { message: "Sección no encontrada" });

    const dishes = await dishesService.getDishes({ section: slug });
    res.render("section", { section, sections: SECTIONS, dishes });
  } catch (error) {
    console.error("Error al renderizar la sección:", error);
    res
      .status(500)
      .render("error", { message: "No se pudo cargar la sección" });
  }
}

export async function renderDish(req, res) {
  try {
    const dish = await dishesService.getDishById(req.params.id);

    if (!dish)
      return res
        .status(404)
        .render("error", { message: "Plato no encontrado" });

    res.render("dish", { dish, sections: SECTIONS });
  } catch (error) {
    console.error("Error al renderizar el plato:", error);
    res
      .status(error.statusCode || 500)
      .render("error", { message: error.message });
  }
}
