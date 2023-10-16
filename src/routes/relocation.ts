import { Router, Request, Response } from 'express';

import { Relocation } from '../models/relocation';

export const relocationRouter = Router();

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
relocationRouter.get('/', async (req: Request, res: Response) => {
  try {
    const relocations = await Relocation.find();
    res.json(relocations);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
relocationRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const relocation = await Relocation.findById(req.params.id);
    if (!relocation) {
      return res.status(404).json({ message: 'Relocation not found' });
    }
    res.json(relocation);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
relocationRouter.post('/', async (req: Request, res: Response) => {
  const relocation = new Relocation(req.body);
  try {
    const newTour = await relocation.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
relocationRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const relocation = await Relocation.findById(req.params.id);
    if (!relocation) {
      return res.status(404).json({ message: 'Relocation not found' });
    }
    relocation.set(req.body);
    const updatedTour = await relocation.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
relocationRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const relocation = await Relocation.findById(req.params.id);
    if (!relocation) {
      return res.status(404).json({ message: 'Relocation not found' });
    }
    await relocation.deleteOne();
    res.status(204).json({ message: 'Relocation deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
