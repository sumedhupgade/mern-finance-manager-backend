const mongoose = require("mongoose");

const recurringExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Optional if the expense is indefinitely recurring
  nextDueDate: { type: Date, required: true },
});

module.exports = mongoose.model("RecurringExpense", recurringExpenseSchema);
