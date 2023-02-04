// Importing modules
const Razorpay = require('razorpay');
const Payment = require('../models/payment.schema');
const dotenv = require('dotenv').config();

const get_razorpay_key = (req, res) => {
    res.status(200).json({
        message: 'Razor Pay Key',
        key: process.env.RAZORPAY_ID
    });
};

const create_order = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR'
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).json({
                message: 'Some error occured'
            });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const pay_order = async (req, res) => {
    try {
        const {
            amount,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature
        } = req.body;

        const newPayment = Payment({
            isPaid: true,
            amount: amount,
            razorpay: {
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature
            }
        });

        await newPayment.save();

        res.status(201).json({
            message: 'Payment was successfull!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporting Modules
module.exports = {
    get_razorpay_key,
    create_order,
    pay_order
};
