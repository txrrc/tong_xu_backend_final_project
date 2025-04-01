import express, { Router } from "express";
import * as affiliationController from "../controllers/affiliationController";
import { validateRequest } from "../middleware/validate";
import { affiliationSchema } from "../validations/affiliationValidation";

const router: Router = express.Router();

router.get("/", affiliationController.getAllAffiliationes);
router.get("/:id", affiliationController.getAffiliationById);
router.post("/", affiliationController.createAffiliation);
router.put("/:id", affiliationController.updateAffiliation);
router.delete("/:id", affiliationController.deleteAffiliation);

export default router;