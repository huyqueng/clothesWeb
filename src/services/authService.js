const bcrypt = require('bcrypt')
const User = require('~/models/userModel')

//Hàm băm mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

//Đăng kí người dùng
const register = async (user) => {
  const hashed = await hashPassword(user.password)
  const newUser = await new User({
    ...user,
    password: hashed,
    role: 'customer'
  })
  return await newUser.save()
}

//Tìm kiếm người dùng theo username
const findUserByUsername = async (username) => {
  return await User.findOne({ username })
}

//Kiểm tra mật khẩu
const isPasswordValid = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword)
}

module.exports = {
  hashPassword,
  register,
  findUserByUsername,
  isPasswordValid
}