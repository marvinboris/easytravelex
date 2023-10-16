"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRouter = void 0;
const express_1 = require("express");
const tour_1 = require("../models/tour");
exports.tourRouter = (0, express_1.Router)();
/**
 * @swagger
 * /tours:
 *   get:
 *     summary: Get all tours
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 *       500:
 *         description: Server error
 */
exports.tourRouter.get('/', async (req, res) => {
    try {
        const tours = await tour_1.Tour.find();
        res.json(tours);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /tours/{id}:
 *   get:
 *     summary: Get a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to get
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Server error
 */
exports.tourRouter.get('/:id', async (req, res) => {
    try {
        const tour = await tour_1.Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(tour);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /tours:
 *   post:
 *     summary: Create a new tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
exports.tourRouter.post('/', async (req, res) => {
    const tour = new tour_1.Tour(req.body);
    try {
        const newTour = await tour.save();
        res.status(201).json(newTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /tours/{id}:
 *   put:
 *     summary: Update a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
exports.tourRouter.put('/:id', async (req, res) => {
    try {
        const tour = await tour_1.Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        tour.set(req.body);
        const updatedTour = await tour.save();
        res.json(updatedTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /tours/{id}:
 *   delete:
 *     summary: Delete a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to delete
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tour deleted
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Server error
 */
exports.tourRouter.delete('/:id', async (req, res) => {
    try {
        const tour = await tour_1.Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        await tour.deleteOne();
        res.status(204).json({ message: 'Tour deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
