// routes/transactionRoutes.js

const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/transactions
// @desc    Get all transactions
router.get("/", authMiddleware, async (req, res) => {
  const { month, year } = req.query;
  try {
    const query = { user: req.user._id }
    if (month && year) {
        startDate = new Date(year, month - 1,1)
        endDate = new Date(year, month,0, 23, 59, 59)
        query.date = {$gte: startDate, $lte: endDate}
    }
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/transactions
// @desc    Create a new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { date, description, amount, type, category } = req.body;
    const newTransaction = new Transaction({
      date,
      description,
      amount,
      type,
      category,
      user: req.user._id,
    });
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
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
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
