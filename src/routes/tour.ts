import { Router, Request, Response } from 'express';

import { Tour } from '../models/tour';

export const tourRouter = Router();

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
tourRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
tourRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
tourRouter.post('/', async (req: Request, res: Response) => {
  const tour = new Tour(req.body);
  try {
    const newTour = await tour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
tourRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    tour.set(req.body);
    const updatedTour = await tour.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
tourRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    await tour.deleteOne();
    res.status(204).json({ message: 'Tour deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
