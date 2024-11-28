const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
  password: { type: String, required: true, minlength: 6 },
  fullName: { type: String, required: true, minlength: 3, maxlength: 30 },
  phone: { type: String, required: true, minlength: 10, maxlength: 12 },
  email: { type: String, required: true, maxlength: 50 },
  role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
  // admin: {type: Boolean, default: false},
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  // _destroy: { type: Boolean, default: false }
}, { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User