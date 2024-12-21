require('dotenv').config()
const generateAccessToken = require('~/ultils/token')
const { register, findUserByUsername, isPasswordValid } = require('~/services/authService')

//Register
const registerUser = async (req, res) => {
  try {
    const existingUsername = findUserByUsername(req.body.username)
    if (existingUsername) {
      return res.status(400).json({ message:'Username already exists. Please choose a different username.' })
    }
    const user = await register(req.body)
    res.status(201).json({ message: 'Register successfully', data: user })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

//Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body
    //Check username
    const user = await findUserByUsername(username)
    if (!user) {
      return res.status(404).json({ message: 'Wrong username or username is not exist' })
    }
    //Checkpassword
    const validPassword = await isPasswordValid(password, user.password)
    if (!validPassword) {
      return res.status(404).json("Wrong password")
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
      res.status(200).json({ message: 'Login successfully', ...others, accessToken })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

//Logout
const logout = (req, res) => {
  res.clearCookie('accessToken')
}

module.exports = {
  registerUser,
  login,
  logout
  // reqRefeshToken
}