const jwt = require('jsonwebtoken')

//Xác thực người dùng
const verifyToken = (req, res, next) => {
  const token = req.headers.token
  if (token) {
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
      return  res.status(403).json('Token không hợp lệ')
      }
      req.user = user
      next();
    })
  }
  else return res.status(401).json("Bạn chưa xác thực người dùng(chưa đăng nhập)")
}

//Xác thực admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next()
    }
    else res.status(403).json("Bạn không có quyền truy nhập")
  })
}

const authMiddleware = {
  verifyToken,
  verifyAdmin
}

module.exports = authMiddleware