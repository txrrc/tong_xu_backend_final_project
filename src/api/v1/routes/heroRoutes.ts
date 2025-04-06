import express, { Router } from "express";
import * as heroController from "../controllers/heroController";
import { validateRequest } from "../middleware/validate";
import { heroSchema } from "../validations/heroValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /heroes:
 *   get:
 *     summary: Retrieve a list of heroes
 *     tags: [Hero]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of heroes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hero'
 */
router.get("/", heroController.getAllHeroes);

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create a new hero
 *     tags: [Hero]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       201:
 *         description: Hero created
 *       400:
 *         description: Invalid input
 */
router.post("/", validateRequest(heroSchema), heroController.createHero);

/**
 * @openapi
 * /heroes/{id}:
 *   put:
 *     summary: Update a hero
 *     tags: [Hero]
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
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       200:
 *         description: Hero updated
 *       404:
 *         description: Hero not found
 */
router.put("/:id", validateRequest(heroSchema), heroController.updateHero);

/**
 * @openapi
 * /heroes/{id}:
 *   delete:
 *     summary: Delete a hero
 *     tags: [Hero]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero deleted
 *       404:
 *         description: Hero not found
 */
router.delete("/:id", heroController.deleteHero);

/**
 * @openapi
 * /heroes/{id}:
 *   get:
 *     summary: Get a hero by ID
 *     tags: [Hero]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       404:
 *         description: Hero not found
 */
router.get("/:id", heroController.getHeroById);

export default router;