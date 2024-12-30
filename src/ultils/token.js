const jwt = require('jsonwebtoken')

//Tạo token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '2d' }
  )
}

module.exports = generateAccessToken