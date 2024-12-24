const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, required: true },
  items: [
    {
      variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
      quantity: { type: Number, required: true, default: 1, min: 1 },
      price: { type: Number, required: true, default: 0 }
    }
  ],
  totalPrice: { type: Number , required: true}
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart