import { Router, Request, Response } from 'express';

import { TourApplication } from '../models/tour-application';

export const tourApplicationRouter = Router();

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
tourApplicationRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tourApplications = await TourApplication.find();
    res.json(tourApplications);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
tourApplicationRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const tourApplication = await TourApplication.findById(req.params.id);
    if (!tourApplication) {
      return res.status(404).json({ message: 'Tour application not found' });
    }
    res.json(tourApplication);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
tourApplicationRouter.post('/', async (req: Request, res: Response) => {
  const tourApplication = new TourApplication(req.body);
  try {
    const newTour = await tourApplication.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
tourApplicationRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const tourApplication = await TourApplication.findById(req.params.id);
    if (!tourApplication) {
      return res.status(404).json({ message: 'Tour application not found' });
    }
    tourApplication.set(req.body);
    const updatedTour = await tourApplication.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
tourApplicationRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const tourApplication = await TourApplication.findById(req.params.id);
    if (!tourApplication) {
      return res.status(404).json({ message: 'Tour application not found' });
    }
    await tourApplication.deleteOne();
    res.status(204).json({ message: 'TourApplication deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
