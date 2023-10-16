"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const express_1 = require("express");
const expense_1 = require("../models/expense");
exports.expenseRouter = (0, express_1.Router)();
/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: Returns all expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Internal server error
 */
exports.expenseRouter.get('/', async (req, res) => {
    try {
        const expenses = await expense_1.Expense.find();
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the expense with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
exports.expenseRouter.get('/:id', async (req, res) => {
    try {
        const expense = await expense_1.Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Returns the newly created expense
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.expenseRouter.post('/', async (req, res) => {
    const expense = new expense_1.Expense(req.body);
    try {
        const newTour = await expense.save();
        res.status(201).json(newTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Returns the updated expense
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exports.expenseRouter.put('/:id', async (req, res) => {
    try {
        const expense = await expense_1.Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        expense.set(req.body);
        const updatedTour = await expense.save();
        res.json(updatedTour);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
exports.expenseRouter.delete('/:id', async (req, res) => {
    try {
        const expense = await expense_1.Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.deleteOne();
        res.status(204).json({ message: 'Expense deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
