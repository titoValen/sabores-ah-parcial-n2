import { Router } from "express";
import * as chefsController from "../controllers/chefs.controller.js";

const router = Router();

router.get("/chefs", chefsController.renderChefs);
router.get("/chefs/new", chefsController.renderNewChef);
router.get("/chefs/:id/edit", chefsController.renderEditChef);

export default router;
