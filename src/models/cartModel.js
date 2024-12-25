const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      productName: { type: String, required: true },
      img: { type: String, required: true },
      variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1, min: 1 },
      price: { type: Number, required: true, default: 0 }
    }
  ],
  totalPrice: { type: Number , required: true}
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart