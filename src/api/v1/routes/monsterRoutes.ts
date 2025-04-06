import express, { Router } from "express";
import * as monsterController from "../controllers/monsterController";
import { validateRequest } from "../middleware/validate";
import { monsterSchema } from "../validations/monsterValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /monsters:
 *   get:
 *     summary: Retrieve a list of monsters
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of monsters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monster'
 */
router.get("/", monsterController.getAllMonsters);

/**
 * @openapi
 * /monsters:
 *   post:
 *     summary: Create a new monster
 *     tags: [Monster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       201:
 *         description: Monster created
 *       400:
 *         description: Invalid input
 */
router.post("/", validateRequest(monsterSchema), monsterController.createMonster);

/**
 * @openapi
 * /monsters/{id}:
 *   put:
 *     summary: Update a monster
 *     tags: [Monster]
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
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       200:
 *         description: Monster updated
 *       404:
 *         description: Monster not found
 */
router.put("/:id", validateRequest(monsterSchema), monsterController.updateMonster);

/**
 * @openapi
 * /monsters/{id}:
 *   delete:
 *     summary: Delete a monster
 *     tags: [Monster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monster deleted
 *       404:
 *         description: Monster not found
 */
router.delete("/:id", monsterController.deleteMonster);

/**
 * @openapi
 * /monsters/{id}:
 *   get:
 *     summary: Get a monster by ID
 *     tags: [Monster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monster data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster not found
 */
router.get("/:id", monsterController.getMonsterById);

export default router;