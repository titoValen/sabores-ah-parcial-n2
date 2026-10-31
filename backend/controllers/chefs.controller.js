import * as chefsService from "../services/chefs.services.js";

const SECTIONS = [
  { id: "entradas", name: "Entradas" },
  { id: "mains", name: "Platos principales" },
  { id: "pastas", name: "Pastas" },
  { id: "postres", name: "Postres" },
  { id: "bebidas", name: "Bebidas" },
];

export async function renderChefs(req, res) {
  try {
    const chefs = await chefsService.getChefs();
    res.render("chefs", { sections: SECTIONS, chefs });
  } catch (error) {
    console.error("Error al renderizar los chefs:", error);
    res
      .status(500)
      .render("error", { message: "No se pudieron cargar los chefs" });
  }
}

export async function renderNewChef(req, res) {
  try {
    res.render("new-chef", { sections: SECTIONS });
  } catch (error) {
    console.error("Error al renderizar el formulario de chef:", error);
    res
      .status(500)
      .render("error", { message: "No se pudo cargar el formulario" });
  }
}

export async function renderEditChef(req, res) {
  try {
    const chef = await chefsService.getChefById(req.params.id);

    if (!chef)
      return res.status(404).render("error", { message: "Chef no encontrado" });

    res.render("edit-chef", { sections: SECTIONS, chef });
  } catch (error) {
    console.error("Error al renderizar la edición del chef:", error);
    res.status(error.statusCode || 500).render("error", {
      message: error.message || "No se pudo cargar el formulario de edición",
    });
  }
}
