const User = require('~/models/userModel')
const { hashPassword } = require('~/services/authService')

//Tạo mới người dùng
const createNewUser = async (user) => {
  const hashed = await hashPassword(user.password)
  const newUser = await new User({
    ...user,
    password: hashed,
  })
  return await newUser.save()
}

//Tìm người dùng theo id
const findUserById = async (userId) => {
  return await User.findById(userId).select('-password')
}

//Lấy danh sách người dùng
const getUsers = async () => {
  return await User.find()
}

//Xóa người dùng theo id
const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId)
}

//Cập nhật người dùng theo id
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