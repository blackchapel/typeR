const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    isPaid: {
        type: Boolean
    },
    amount: {
        type: Number
    },
    razorpay: {
        orderId: {
            type: String
        },
        paymentId: {
            type: String
        },
        signature: {
            type: String
        }
    }
});

const Payment = mongoose.model('payment', PaymentSchema);

module.exports = Payment;
