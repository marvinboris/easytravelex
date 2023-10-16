import { Router, Request, Response } from 'express';

import { Visa } from '../models/visa';

export const visaRouter = Router();

// GET /visas
/**
 * @swagger
 * /visas:
 *   get:
 *     summary: Returns all visas
 *     responses:
 *       200:
 *         description: A list of visas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visa'
 *       500:
 *         description: Internal server error
 */
visaRouter.get('/', async (req: Request, res: Response) => {
  try {
    const visas = await Visa.find();
    res.json(visas);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /visas/:id
/**
 * @swagger
 * /visas/{id}:
 *   get:
 *     summary: Returns a visa by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visa to get
 *     responses:
 *       200:
 *         description: A visa object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visa'
 *       404:
 *         description: Visa not found
 *       500:
 *         description: Internal server error
 */
visaRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) {
      return res.status(404).json({ message: 'Visa not found' });
    }
    res.json(visa);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// POST /visas
/**
 * @swagger
 * /visas:
 *   post:
 *     summary: Creates a new visa
 *     requestBody:
 *       description: Visa object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visa'
 *     responses:
 *       201:
 *         description: The created visa object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visa'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
visaRouter.post('/', async (req: Request, res: Response) => {
  const visa = new Visa(req.body);
  try {
    const newVisa = await visa.save();
    res.status(201).json(newVisa);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// PUT /visas/:id
/**
 * @swagger
 * /visas/{id}:
 *   put:
 *     summary: Updates a visa by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visa to update
 *     requestBody:
 *       description: Visa object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visa'
 *     responses:
 *       200:
 *         description: The updated visa object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visa'
 *       404:
 *         description: Visa not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
visaRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) {
      return res.status(404).json({ message: 'Visa not found' });
    }
    visa.set(req.body);
    const updatedVisa = await visa.save();
    res.json(updatedVisa);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// DELETE /visas/:id
/**
 * @swagger
 * /visas/{id}:
 *   delete:
 *     summary: Deletes a visa by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visa to delete
 *     responses:
 *       200:
 *         description: Visa deleted
 *       404:
 *         description: Visa not found
 *       500:
 *         description: Internal server error
 */
visaRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) {
      return res.status(404).json({ message: 'Visa not found' });
    }
    await visa.deleteOne();
    res.status(204).json({ message: 'Visa deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
