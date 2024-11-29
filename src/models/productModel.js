const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  description: { type: String, required: true, minlength: 5 },
  price: { type: Number, default: 0 },
})