import { Router, Request, Response } from 'express';

import { Testimonial } from '../models/testimonial';

export const testimonialRouter = Router();

// GET /testimonials
/**
 * @swagger
 * /testimonials:
 *   get:
 *     description: Get all testimonials
 *     responses:
 *       200:
 *         description: Success
 */
testimonialRouter.get('/', async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// GET /testimonials/:id
/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     description: Get a testimonial by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the testimonial
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Testimonial not found
 */
testimonialRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// POST /testimonials
/**
 * @swagger
 * /testimonials:
 *   post:
 *     description: Create a new testimonial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonial created
 *       400:
 *         description: Bad request
 */
testimonialRouter.post('/', async (req: Request, res: Response) => {
  const testimonial = new Testimonial(req.body);
  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// PUT /testimonials/:id
/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     description: Update a testimonial by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the testimonial
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Testimonial updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Testimonial not found
 */
testimonialRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    testimonial.set(req.body);
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// DELETE /testimonials/:id
/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     description: Delete a testimonial by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the testimonial
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial deleted
 *       404:
 *         description: Testimonial not found
 */
testimonialRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await testimonial.deleteOne();
    res.status(204).json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
