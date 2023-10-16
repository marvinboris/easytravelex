"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customPackageApplicationRouter = void 0;
const express_1 = require("express");
const custom_package_application_1 = require("../models/custom-package-application");
exports.customPackageApplicationRouter = (0, express_1.Router)();
/**
 * @swagger
 * /custom-package-applications:
 *   get:
 *     summary: Get all custom package applications
 *     responses:
 *       200:
 *         description: A list of custom package applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomPackageApplication'
 *       500:
 *         description: Internal server error
 */
exports.customPackageApplicationRouter.get('/', async (req, res) => {
    try {
        const visaApplications = await custom_package_application_1.CustomPackageApplication.find();
        res.json(visaApplications);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /custom-package-applications/{id}:
 *   get:
 *     summary: Get a custom package application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the custom package application to get
 *     responses:
 *       200:
 *         description: A custom package application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPackageApplication'
 *       404:
 *         description: Custom package application not found
 *       500:
 *         description: Internal server error
 */
exports.customPackageApplicationRouter.get('/:id', async (req, res) => {
    try {
        const visaApplication = await custom_package_application_1.CustomPackageApplication.findById(req.params.id);
        if (!visaApplication) {
            return res
                .status(404)
                .json({ message: 'Custom package application not found' });
        }
        res.json(visaApplication);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /custom-package-applications:
 *   post:
 *     summary: Create a new custom package application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomPackageApplication'
 *     responses:
 *       201:
 *         description: The created custom package application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPackageApplication'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.customPackageApplicationRouter.post('/', async (req, res) => {
    const visaApplication = new custom_package_application_1.CustomPackageApplication(req.body);
    try {
        const newTour = await visaApplication.save();
        res.status(201).json(newTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /custom-package-applications/{id}:
 *   put:
 *     summary: Update a custom package application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the custom package application to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomPackageApplication'
 *     responses:
 *       200:
 *         description: The updated custom package application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPackageApplication'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Custom package application not found
 *       500:
 *         description: Internal server error
 */
exports.customPackageApplicationRouter.put('/:id', async (req, res) => {
    try {
        const visaApplication = await custom_package_application_1.CustomPackageApplication.findById(req.params.id);
        if (!visaApplication) {
            return res
                .status(404)
                .json({ message: 'Custom package application not found' });
        }
        visaApplication.set(req.body);
        const updatedTour = await visaApplication.save();
        res.json(updatedTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /custom-package-applications/{id}:
 *   delete:
 *     summary: Delete a custom package application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the custom package application to delete
 *     responses:
 *       200:
 *         description: Custom package application deleted
 *       404:
 *         description: Custom package application not found
 *       500:
 *         description: Internal server error
 */
exports.customPackageApplicationRouter.delete('/:id', async (req, res) => {
    try {
        const visaApplication = await custom_package_application_1.CustomPackageApplication.findById(req.params.id);
        if (!visaApplication) {
            return res
                .status(404)
                .json({ message: 'Custom package application not found' });
        }
        await visaApplication.deleteOne();
        res.status(204).json({ message: 'CustomPackageApplication deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
