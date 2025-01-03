const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
    password: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true, minlength: 3 },
    phone: { type: String, required: true, minlength: 10, maxlength: 13 },
    email: { type: String, required: true, maxlength: 50 },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User