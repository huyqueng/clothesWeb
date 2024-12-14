require('dotenv').config()
const User = require('~/models/userModel')
const bcrypt = require('bcrypt')
const generateAccessToken = require('~/ultils/token')
const { register } = require('~/services/authService')

//Register
const registerUser = async (req, res) => {
  try {
    const user = await register(req.body)
    res.status(201).json({ message: 'Register successfully', data: user })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

//Login
const login = async (req, res) => {
  try {
    //Check username
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      res.status(404).json({ message: 'Wrong username or username is not exist' })
    }
    //Checkpassword
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      res.status(404).json("Wrong password")
    }

    if (user && validPassword) {
      const accessToken = generateAccessToken(user)
      // const refreshToken = generateRefreshToken(user)
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false
      })
      const { password, ...others } = user._doc
      res.status(200).json({ message: 'Login successfully', ...others, accessToken })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

//Logout
const logout = (req, res) => {
  res.clearCookie('refreshToken')
}

module.exports = {
  registerUser,
  login,
  // reqRefeshToken
}