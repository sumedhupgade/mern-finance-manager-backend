const express = require("express");
const router = express.Router();
const RecurringExpense = require("../models/RecurringExpense");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const result = await RecurringExpense.findById({ user: req.user._id });
  res.json(result);
});

router.post("/", async (req, res) => {
  const { userId, amount, category, frequency, startDate, endDate } = req.body;

  const nextDueDate = calculateNextDueDate(startDate, frequency); // Helper function to calculate the next due date

  try {
    const newRecurringExpense = await RecurringExpense.create({
      userId,
      amount,
      category,
      frequency,
      startDate,
      endDate,
      nextDueDate,
    });

    res.status(201).json(newRecurringExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating recurring expense", error });
  }
});

module.exports = router;