import express, { Router } from "express";
import * as heroController from "../controllers/heroController";
import { validateRequest } from "../middleware/validate";
import { heroSchema } from "../validations/heroValidation";

const router: Router = express.Router();

router.get("/", heroController.getAllHeroes);
router.post("/", validateRequest(heroSchema), heroController.createHero);
router.put("/:id", validateRequest(heroSchema), heroController.updateHero);
router.delete("/:id", heroController.deleteHero);
router.get("/:id", heroController.getHeroById);

export default router;