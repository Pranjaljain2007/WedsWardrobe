const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Firebase UID to identify user
  uid: { type: String, required: true },

  //order id
  orderId: { type: String },

  // Ordered items
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },

      gender: { type: String },
      category: { type: String },
      subcategory: { type: String },

      imageUrl: { type: String },
      size: { type: String, required: true },
      rentalStartDate: Date,
      rentalEndDate: Date,
    }
  ],

  address: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },


  totalAmount: { type: Number, required: true },

  refundableDeposit: { type: Number, default: 0 },

  // Payment 
  payment: {
    method: { type: String, enum: ['razorpay', 'cod'], default: 'cod' },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String
  },


  // Order 
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'picked_up', 'returned', 'cancelled'],
    default: 'placed'
  },

  placedAt: { type: Date, default: Date.now }, // when user placed order
  pickupDate: { type: Date }, // scheduled pickup date
  expectedDeliveryDate: { type: Date },


}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
