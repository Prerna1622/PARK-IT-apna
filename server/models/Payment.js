const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        enum: ['Online', 'Cash'],
        default: 'Online',
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
