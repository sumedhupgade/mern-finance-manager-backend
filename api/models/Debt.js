const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  debt_type: { type: String },
  emi_amount: { type: String },
  owed_to: {type: String},
  startDate: { type: Date },
  endDate: { type: Date }, // Optional if the expense is indefinitely recurring
  emiDueDate: { type: Date },
  extraPayments: {type: Array},
  interestRates: {type: Array},
});

module.exports = mongoose.model("Debt", debtSchema);
