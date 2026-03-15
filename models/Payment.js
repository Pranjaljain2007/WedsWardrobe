const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    uid: { type: String, required: true, index: true }, // Firebase UID of the user
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // link to order

    amount: { type: Number, required: true }, // payment amount 
    currency: { type: String, default: 'INR' },

    method: { type: String, enum: ['razorpay', 'cod'], default: 'razorpay' },

    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },

    // Razorpay-specific fields
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String }, // filled after successful payment
    razorpay_signature: { type: String },  // for verification

    paidAt: { type: Date }, // when payment was successful
    refundedAt: { type: Date }, // if refunded

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
