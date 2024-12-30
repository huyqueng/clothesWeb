const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
},{ timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
