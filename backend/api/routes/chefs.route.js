import { Router } from "express";
import * as chefsController from "../controllers/chefs.controller.js";

const router = Router();

router.get("/", chefsController.getChefs);
router.get("/:id/dishes", chefsController.getChefDishes);
router.get("/:id", chefsController.getChefById);
router.post("/", chefsController.createChef);
router.put("/:id", chefsController.updateChef);
router.delete("/:id", chefsController.deleteChef);

export default router;