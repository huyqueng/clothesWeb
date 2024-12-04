require('dotenv').config()
const User = require('~/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register
const registerUser = async (req, res) => {
  try {
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.password, salt)

    //Create new user
    const newUser = await new User({
      username: req.body.username,
      password: hashed,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      role: 'customer'
    })

    const user = await newUser.save()
    res.status(201).json({ message: 'Register successfully', data: user })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

//Generate access token & refesh token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '2d' }
  )
}

// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { id: user.id, admin: user.admin },
//     process.env.JWT_REFRESH_TOKEN,
//     { expiresIn: '1m' }
//   )
// }

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