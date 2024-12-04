const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlegth: 30, unique: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    }
  ]
},{ timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category