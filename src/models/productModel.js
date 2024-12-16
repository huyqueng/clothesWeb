const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true},
  description: { type: String , required: true },  
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  img: { type: Array, required: true }
},{ timestamps: true })

// const variantSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true  },
//   size: { type: Number },
//   color: { type: String },
//   stock: { type: Number, min: 0, default: 0 },
//   isAccessory: { type: Boolean, default: false }
// }, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
// const ProductVariant = mongoose.model('ProductVariant', variantSchema)

module.exports = {
  Product,
  // ProductVariant
}