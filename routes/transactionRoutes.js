// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// @route   POST /api/transactions
// @desc    Create a new transaction
router.post('/', async (req, res) => {
    try {
        const { date, description, amount, type, category } = req.body;
        const newTransaction = new Transaction({ date, description, amount, type, category });
        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/transactions
// @desc    Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
router.put('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const { date, description, amount, type, category } = req.body;
        transaction.date = date;
        transaction.description = description;
        transaction.amount = amount;
        transaction.type = type;
        transaction.category = category;
        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        await transaction.deleteOne();
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
