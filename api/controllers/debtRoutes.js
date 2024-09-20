const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const result = await Debt.find({
    $or: [
      { user: req.user._id },          // Debts owned by the user
      { owed_to: req.user._id },     // Debts owed to the user (based on owed_to field)
    ]
  });
  res.json(result);
});

router.post("/", authMiddleware, async (req, res) => {
  const {
    amount,
    debt_type,
    emiDueDate,
    owed_to,
    startDate,
    endDate,
    extraPayments,
    interestRates,
  } = req.body;
  try {
    const newLoan = await Debt.create({
      user: req.user._id,
      amount,
      debt_type,
      emiDueDate,
      owed_to,
      startDate,
      endDate,
      extraPayments,
    });

    res.status(201).json(newLoan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating Debt", error });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Debt.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Debt not found" });
    }
    const {
      amount,
      debt_type,
      emiDueDate,
      owed_to,
      startDate,
      endDate,
      extraPayments,
      interestRates,
    } = req.body;
    transaction.debt_type = debt_type;
    transaction.emiDueDate = emiDueDate;
    transaction.amount = amount;
    transaction.owed_to = owed_to;
    transaction.startDate = startDate;
    transaction.endDate = endDate;
    transaction.extraPayments = extraPayments;
    transaction.interestRates = interestRates;
    const updatedDebt = await transaction.save();
    res.json(updatedDebt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Debt.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Debt not found" });
    }
    await transaction.deleteOne();
    res.json({ message: "Debt deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
