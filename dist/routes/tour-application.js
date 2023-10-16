"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourApplicationRouter = void 0;
const express_1 = require("express");
const tour_application_1 = require("../models/tour-application");
exports.tourApplicationRouter = (0, express_1.Router)();
// GET /tour-applications
/**
 * @swagger
 * /tour-applications:
 *   get:
 *     summary: Get all tour applications
 *     responses:
 *       200:
 *         description: List of tour applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TourApplication'
 *       500:
 *         description: Server error
 */
exports.tourApplicationRouter.get('/', async (req, res) => {
    try {
        const tourApplications = await tour_application_1.TourApplication.find();
        res.json(tourApplications);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET /tour-applications/:id
/**
 * @swagger
 * /tour-applications/{id}:
 *   get:
 *     summary: Get a tour application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour application
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour application details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourApplication'
 *       404:
 *         description: Tour application not found
 *       500:
 *         description: Server error
 */
exports.tourApplicationRouter.get('/:id', async (req, res) => {
    try {
        const tourApplication = await tour_application_1.TourApplication.findById(req.params.id);
        if (!tourApplication) {
            return res.status(404).json({ message: 'Tour application not found' });
        }
        res.json(tourApplication);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// POST /tour-applications
/**
 * @swagger
 * /tour-applications:
 *   post:
 *     summary: Create a new tour application
 *     requestBody:
 *       description: Tour application object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourApplication'
 *     responses:
 *       201:
 *         description: Tour application created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourApplication'
 *       400:
 *         description: Invalid request
 */
exports.tourApplicationRouter.post('/', async (req, res) => {
    const tourApplication = new tour_application_1.TourApplication(req.body);
    try {
        const newTour = await tourApplication.save();
        res.status(201).json(newTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// PUT /tour-applications/:id
/**
 * @swagger
 * /tour-applications/{id}:
 *   put:
 *     summary: Update a tour application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour application
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Tour application object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourApplication'
 *     responses:
 *       200:
 *         description: Tour application updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourApplication'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Tour application not found
 */
exports.tourApplicationRouter.put('/:id', async (req, res) => {
    try {
        const tourApplication = await tour_application_1.TourApplication.findById(req.params.id);
        if (!tourApplication) {
            return res.status(404).json({ message: 'Tour application not found' });
        }
        tourApplication.set(req.body);
        const updatedTour = await tourApplication.save();
        res.json(updatedTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// DELETE /tour-applications/:id
/**
 * @swagger
 * /tour-applications/{id}:
 *   delete:
 *     summary: Delete a tour application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour application
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour application deleted
 *       404:
 *         description: Tour application not found
 *       500:
 *         description: Server error
 */
exports.tourApplicationRouter.delete('/:id', async (req, res) => {
    try {
        const tourApplication = await tour_application_1.TourApplication.findById(req.params.id);
        if (!tourApplication) {
            return res.status(404).json({ message: 'Tour application not found' });
        }
        await tourApplication.deleteOne();
        res.status(204).json({ message: 'TourApplication deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
