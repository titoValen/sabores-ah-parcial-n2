import { Router } from "express";
import * as dishesController from "../controllers/dishes.controller.js";

const router = Router();

router.get("/", dishesController.renderDishes);
router.get("/sections/:slug", dishesController.renderSection);
router.get("/dishes/new", dishesController.renderNewDish);
router.get("/dishes/:id/edit", dishesController.renderEditDish);
router.get("/dishes/:id", dishesController.renderDish);

export default router;
