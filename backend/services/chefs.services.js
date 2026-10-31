import { db, ObjectId } from "../config/db.js";

function getObjectId(id) {
  if (!ObjectId.isValid(id)) {
    const error = new Error("ID inválido");
    error.statusCode = 400;
    throw error;
  }

  return new ObjectId(id);
}

export async function getChefs() {
  const chefsCollection = db.collection("chefs");
  const chefs = await chefsCollection.find().toArray();

  return chefs;
}

export async function getChefById(id) {
  const chef = await db.collection("chefs").findOne({ _id: getObjectId(id) });

  return chef;
}

export async function createChef(chef) {
  const result = await db.collection("chefs").insertOne(chef);
  return result.insertedId;
}

export async function updateChef(id, updatedChef) {
  const result = await db
    .collection("chefs")
    .updateOne({ _id: getObjectId(id) }, { $set: updatedChef });

  return result;
}

export async function deleteChef(id) {
  const result = await db
    .collection("chefs")
    .deleteOne({ _id: getObjectId(id) });

  return result;
}
