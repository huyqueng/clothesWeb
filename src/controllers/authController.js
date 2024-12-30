require('dotenv').config()
const generateAccessToken = require('~/ultils/token')
const { register, findUserByUsername, isPasswordValid } = require('~/services/authService')

//Đăng kí (Tạo tài khoản)
const registerUser = async (req, res) => {
  try {
    const existingUsername = await findUserByUsername(req.body.username)
    if (existingUsername) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại, vui lòng nhập tên đăng nhập khác.' })
    }
    const user = await register(req.body)
    res.status(201).json({ message: 'Đăng kí thành công', data: user })
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

//Đăng nhập
const login = async (req, res) => {
  try {
    const { username, password } = req.body
    //Check username
    const user = await findUserByUsername(username)
    if (!user) {
      return res.status(404).json({ message: 'Sai tên đăng nhập hoặc tên đăng nhập không tồn tại' })
    }
    //Checkpassword
    const validPassword = await isPasswordValid(password, user.password)
    if (!validPassword) {
      return res.status(404).json({ message: 'Mật khẩu không hợp lệ' })
    }
    //Generate token
    if (user && validPassword) {
      const accessToken = generateAccessToken(user)
      // const refreshToken = generateRefreshToken(user)
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false
      })
      const { password, ...others } = user._doc
      res.status(200).json({ message: 'Đăng nhập thành công', ...others, accessToken })
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

//Đăng xuất
const logout = (req, res) => {
  res.clearCookie('accessToken')
}

module.exports = {
  registerUser,
  login,
  logout
}