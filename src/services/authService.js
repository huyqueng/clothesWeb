const bcrypt = require('bcrypt')
const User = require('~/models/userModel')

//Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

//Register new user
const register = async (user) => {
  const hashed = await hashPassword(user.password)
  const newUser = await new User({
    ...user,
    password: hashed,
    role: 'customer'
  })
  return await newUser.save()
}

//Check user
const findUserByUsername = async (username) => {
  return await User.findOne({ username })
}

//Check password
const isPasswordValid = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword)
}

module.exports = {
  hashPassword,
  register,
  findUserByUsername,
  isPasswordValid
}