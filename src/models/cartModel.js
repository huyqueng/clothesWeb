const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const cartItemsSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)
const CartItems = mongoose.model('ProductVariant', cartItemsSchema)

module.exports = {
  Cart,
  CartItems
}