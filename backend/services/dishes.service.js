import { db, ObjectId } from "../config/db.js";

function getObjectId(id) {
  if (!ObjectId.isValid(id)) {
    const error = new Error("ID inválido");
    error.statusCode = 400;
    throw error;
  }

  return new ObjectId(id);
}

export async function getDishes({ section, typeOfDish, vegetarian } = {}) {
  const dishesCollection = db.collection("dishes");
  const filter = {};

  if (section) filter.section = section;
  if (typeOfDish) filter.typeOfDish = typeOfDish;
  if (vegetarian !== undefined) {
    if (vegetarian !== true && vegetarian !== false && vegetarian !== "true" && vegetarian !== "false") {
      const error = new Error("El filtro vegetarian debe ser true o false");
      error.statusCode = 400;
      throw error;
    }

    filter.vegetarian = vegetarian === true || vegetarian === "true";
  }

  const dishes = await dishesCollection.find(filter).toArray();

  return dishes;
}

export async function getDishById(id) {
  const dish = await db
    .collection("dishes")
    .findOne({ _id: getObjectId(id) });

  return dish;
}

export async function createDish(dish) {
  if (dish.chefId) {
    const chef = await db.collection("chefs").findOne({ _id: getObjectId(dish.chefId) });

    if (!chef) {
      const error = new Error("Chef no encontrado");
      error.statusCode = 400;
      throw error;
    }
  }

  const result = await db.collection("dishes").insertOne(dish);
  return result.insertedId;
}

export async function updateDish(id, updatedDish) {
  if (updatedDish.chefId) {
    const chef = await db.collection("chefs").findOne({ _id: getObjectId(updatedDish.chefId) });

    if (!chef) {
      const error = new Error("Chef no encontrado");
      error.statusCode = 400;
      throw error;
    }
  }

  const result = await db
    .collection("dishes")
    .updateOne({ _id: getObjectId(id) }, { $set: updatedDish });

  return result;
}

export async function deleteDish(id) {
  const result = await db
    .collection("dishes")
    .deleteOne({ _id: getObjectId(id) });

  return result;
}

export async function getDishesByChef(chefId) {
  getObjectId(chefId);
  return db.collection("dishes").find({ chefId }).toArray();
}
