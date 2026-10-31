import * as dishesService from "../../services/dishes.service.js";
import * as chefsService from "../../services/chefs.services.js";

function validateChef(chef, partial = false) {
  const fields = ["name", "photo", "description"];

  if (!partial && fields.some((field) => !chef[field])) {
    return "Todos los campos del chef son obligatorios";
  }

  if (fields.some((field) => chef[field] !== undefined && typeof chef[field] !== "string")) {
    return "Los campos del chef deben ser cadenas";
  }

  return null;
}

function getErrorStatus(error) {
  return error.statusCode || 500;
}

export async function getChefs(req, res) {
  try {
    const chefs = await chefsService.getChefs();
    res.json(chefs);
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function getChefById(req, res) {
  try {
    const id = req.params.id;
    const chef = await chefsService.getChefById(id);

    if (!chef) return res.status(404).json({ message: "Chef no encontrado" });

    res.json(chef);
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function createChef(req, res) {
  try {
    const { name, photo, description } = req.body;
    const newChef = { name, photo, description };
    const validationError = validateChef(newChef);

    if (validationError) return res.status(400).json({ message: validationError });

    const createdChef = await chefsService.createChef(newChef);

    res.status(201).json({ _id: String(createdChef) });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function updateChef(req, res) {
  try {
    const id = req.params.id;
    const { name, photo, description } = req.body;
    const updatedChef = {};

    if (name !== undefined) updatedChef.name = name;
    if (photo !== undefined) updatedChef.photo = photo;
    if (description !== undefined) updatedChef.description = description;

    const validationError = validateChef(updatedChef, true);

    if (validationError) return res.status(400).json({ message: validationError });
    if (Object.keys(updatedChef).length === 0)
      return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar" });

    const result = await chefsService.updateChef(id, updatedChef);

    if (!result || result.matchedCount === 0)
      return res.status(404).json({ message: "Chef no encontrado" });

    res.json({ message: "Chef actualizado correctamente", _id: id });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function deleteChef(req, res) {
  try {
    const id = req.params.id;
    const result = await chefsService.deleteChef(id);

    if (!result || result.deletedCount === 0)
      return res.status(404).json({ message: "Chef no encontrado" });

    res.json({ message: "Chef eliminado correctamente" });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function getChefDishes(req, res) {
  try {
    const { id } = req.params;
    const chef = await chefsService.getChefById(id);

    if (!chef) return res.status(404).json({ message: "Chef no encontrado" });

    const dishes = await dishesService.getDishesByChef(id);
    res.json(dishes);
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}