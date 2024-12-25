const User = require('~/models/userModel')
const { hashPassword } = require('~/services/authService')

const createNewUser = async (user) => {
  const hashed = await hashPassword(user.password)
  const newUser = await new User({
    ...user,
    password: hashed,
  })
  return await newUser.save()
}

const findUserById = async (userId) => {
  return await User.findById(userId).select('-password')
}

const getUsers = async () => {
  return await User.find()
}

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId)
}

const updateUserById = async (userId, user) => {
  return await User.findByIdAndUpdate(userId, { $set: user }, { new: true }).select('-password')
}

module.exports = {
  createNewUser,
  findUserById,
  getUsers,
  deleteUserById,
  updateUserById
}