import express, { Router } from "express";
import * as affiliationController from "../controllers/affiliationController";
import { validateRequest } from "../middleware/validate";
import { affiliationSchema } from "../validations/affiliationValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /affiliationes:
 *   get:
 *     summary: Retrieve a list of affiliations
 *     tags: [Affiliation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of affiliations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Affiliation'
 */
router.get("/", affiliationController.getAllAffiliations);


/**
 * @openapi
 * /affiliationes/{id}:
 *   get:
 *     summary: Get a affiliation by ID
 *     tags: [Affiliation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Affiliation data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Affiliation'
 *       404:
 *         description: Affiliation not found
 */
router.get("/:id", affiliationController.getAffiliationById);

/**
 * @openapi
 * /affiliation:
 *   post:
 *     summary: Create a new affiliation
 *     tags: [Affiliation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Affiliation'
 *     responses:
 *       201:
 *         description: Affiliation created
 *       400:
 *         description: Invalid input
 */
router.post("/", affiliationController.createAffiliation);

/**
 * @openapi
 * /affiliationes/{id}:
 *   put:
 *     summary: Update an affiliation
 *     tags: [Affiliation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Affiliation'
 *     responses:
 *       200:
 *         description: Affiliation updated
 *       404:
 *         description: Affiliation not found
 */
router.put("/:id", affiliationController.updateAffiliation);

/**
 * @openapi
 * /affiliationes/{id}:
 *   delete:
 *     summary: Delete a affiliation
 *     tags: [Affiliation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Affiliation deleted
 *       404:
 *         description: Affiliation not found
 */
router.delete("/:id", affiliationController.deleteAffiliation);

export default router;