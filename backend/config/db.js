import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "AH20232CP1";

const client = new MongoClient(MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Conexión a la base de datos establecida - " + DB_NAME);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

export { connectDB, db, ObjectId };
