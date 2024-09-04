const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: [true, 'Transaction type is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    description: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
      },
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
