import express, { Router } from "express";
import * as monsterController from "../controllers/monsterController";
import { validateRequest } from "../middleware/validate";
import { monsterSchema } from "../validations/monsterValidation";

const router: Router = express.Router();

router.get("/", monsterController.getAllMonsters);
router.post("/", validateRequest(monsterSchema), monsterController.createMonster);
router.put("/:id", validateRequest(monsterSchema), monsterController.updateMonster);
router.delete("/:id", monsterController.deleteMonster);
router.get("/:id", monsterController.getMonsterById);

export default router;