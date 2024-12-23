const mongoose = require('mongoose')

//Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  description: { type: String, required: true },  
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  img: { type: [String], required: true }
},{ timestamps: true })

//Product variant
const variantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true  },
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, min: 0, default: 0, required: true },
  isAccessory: { type: Boolean, default: false }
}, { timestamps: true })

variantSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true })

const Product = mongoose.model('Product', productSchema)
const ProductVariant = mongoose.model('ProductVariant', variantSchema)

module.exports = {
  Product,
  ProductVariant
}