import { Router, Request, Response } from 'express';

import { VisaApplication } from '../models/visa-application';

export const visaApplicationRouter = Router();

/**
 * @swagger
 * /visa-applications:
 *   get:
 *     summary: Get all visa applications
 *     responses:
 *       200:
 *         description: Returns an array of visa applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VisaApplication'
 *       500:
 *         description: Internal server error
 */
visaApplicationRouter.get('/', async (req: Request, res: Response) => {
  try {
    const visaApplications = await VisaApplication.find();
    res.json(visaApplications);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /visa-applications/{id}:
 *   get:
 *     summary: Get a visa application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the visa application to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a visa application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisaApplication'
 *       404:
 *         description: Visa application not found
 *       500:
 *         description: Internal server error
 */
visaApplicationRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const visaApplication = await VisaApplication.findById(req.params.id);
    if (!visaApplication) {
      return res.status(404).json({ message: 'Visa application not found' });
    }
    res.json(visaApplication);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /visa-applications:
 *   post:
 *     summary: Create a new visa application
 *     requestBody:
 *       description: Visa application object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisaApplication'
 *     responses:
 *       201:
 *         description: Returns the created visa application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisaApplication'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
visaApplicationRouter.post('/', async (req: Request, res: Response) => {
  const visaApplication = new VisaApplication(req.body);
  try {
    const newTour = await visaApplication.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /visa-applications/{id}:
 *   put:
 *     summary: Update a visa application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the visa application to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Visa application object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisaApplication'
 *     responses:
 *       200:
 *         description: Returns the updated visa application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisaApplication'
 *       404:
 *         description: Visa application not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
visaApplicationRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const visaApplication = await VisaApplication.findById(req.params.id);
    if (!visaApplication) {
      return res.status(404).json({ message: 'Visa application not found' });
    }
    visaApplication.set(req.body);
    const updatedTour = await visaApplication.save();
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /visa-applications/{id}:
 *   delete:
 *     summary: Delete a visa application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the visa application to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Visa application deleted
 *       404:
 *         description: Visa application not found
 *       500:
 *         description: Internal server error
 */
visaApplicationRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const visaApplication = await VisaApplication.findById(req.params.id);
    if (!visaApplication) {
      return res.status(404).json({ message: 'Visa application not found' });
    }
    await visaApplication.deleteOne();
    res.status(204).json({ message: 'Visa application deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     VisaApplication:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - passportNumber
 *         - nationality
 *         - visaType
 *         - arrivalDate
 *         - departureDate
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the visa applicant
 *         lastName:
 *           type: string
 *           description: Last name of the visa applicant
 *         email:
 *           type: string
 *           description: Email of the visa applicant
 *         passportNumber:
 *           type: string
 *           description: Passport number of the visa applicant
 *         nationality:
 *           type: string
 *           description: Nationality of the visa applicant
 *         visaType:
 *           type: string
 *           description: Type of visa applied for
 *         arrivalDate:
 *           type: string
 *           format: date
 *           description: Date of arrival
 *         departureDate:
 *           type: string
 *           format: date
 *           description: Date of departure
 */
