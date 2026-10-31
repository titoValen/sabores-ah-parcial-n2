import { Router } from "express";
import * as dishesController from "../controllers/dishes.controller.js";

const router = Router();

router.get("/", dishesController.getDishes);
router.get("/:id", dishesController.getDishById);
router.post("/", dishesController.createDish);
router.put("/:id", dishesController.updateDish);
router.delete("/:id", dishesController.deleteDish);

export default router;