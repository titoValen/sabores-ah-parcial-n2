import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB } from "./config/db.js";
import dishesRoutes from "./api/routes/dishes.route.js";
import chefsRoutes from "./api/routes/chefs.route.js";
import viewDishesRoutes from "./routes/dishes.route.js";
import viewChefsRoutes from "./routes/chefs.route.js";

const app = express();
const PORT = process.env.PORT || 3333;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/dishes", dishesRoutes);
app.use("/api/chefs", chefsRoutes);
app.use("/", viewDishesRoutes);
app.use("/", viewChefsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
