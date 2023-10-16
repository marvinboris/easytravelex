"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relocationRouter = void 0;
const express_1 = require("express");
const relocation_1 = require("../models/relocation");
exports.relocationRouter = (0, express_1.Router)();
/**
 * @swagger
 * /relocations:
 *   get:
 *     summary: Returns all relocations
 *     responses:
 *       200:
 *         description: A list of all relocations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Relocation'
 *       500:
 *         description: Internal server error
 */
exports.relocationRouter.get('/', async (req, res) => {
    try {
        const relocations = await relocation_1.Relocation.find();
        res.json(relocations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /relocations/{id}:
 *   get:
 *     summary: Returns a relocation by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the relocation to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The relocation with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relocation'
 *       404:
 *         description: The relocation with the specified ID was not found
 *       500:
 *         description: Internal server error
 */
exports.relocationRouter.get('/:id', async (req, res) => {
    try {
        const relocation = await relocation_1.Relocation.findById(req.params.id);
        if (!relocation) {
            return res.status(404).json({ message: 'Relocation not found' });
        }
        res.json(relocation);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /relocations:
 *   post:
 *     summary: Creates a new relocation
 *     requestBody:
 *       description: The relocation to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Relocation'
 *     responses:
 *       201:
 *         description: The created relocation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relocation'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
exports.relocationRouter.post('/', async (req, res) => {
    const relocation = new relocation_1.Relocation(req.body);
    try {
        const newTour = await relocation.save();
        res.status(201).json(newTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /relocations/{id}:
 *   put:
 *     summary: Updates a relocation by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the relocation to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated relocation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Relocation'
 *     responses:
 *       200:
 *         description: The updated relocation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relocation'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: The relocation with the specified ID was not found
 *       500:
 *         description: Internal server error
 */
exports.relocationRouter.put('/:id', async (req, res) => {
    try {
        const relocation = await relocation_1.Relocation.findById(req.params.id);
        if (!relocation) {
            return res.status(404).json({ message: 'Relocation not found' });
        }
        relocation.set(req.body);
        const updatedTour = await relocation.save();
        res.json(updatedTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /relocations/{id}:
 *   delete:
 *     summary: Deletes a relocation by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the relocation to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted relocation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the relocation was deleted
 *       404:
 *         description: The relocation with the specified ID was not found
 *       500:
 *         description: Internal server error
 */
exports.relocationRouter.delete('/:id', async (req, res) => {
    try {
        const relocation = await relocation_1.Relocation.findById(req.params.id);
        if (!relocation) {
            return res.status(404).json({ message: 'Relocation not found' });
        }
        await relocation.deleteOne();
        res.status(204).json({ message: 'Relocation deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
