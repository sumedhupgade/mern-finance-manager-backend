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
        enum: ['income', 'expense','investment'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
