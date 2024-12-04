const User = require('~/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      password: hashed,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role
    })
    const user = await newUser.save()
    res.status(200).json({ message: 'Created new user successfully' , data: user })
  } catch (error) {
    res.status(500).json({ message:'Internal Server Error', error: error })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ message: 'Got users successfully', data:users })
  } catch (error) {
    res.status(500).json({ message:'Internal Server Error', error: error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found'})
    }
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json("User not found")
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password')
    res.status(200).json({ message: 'Updated successfully', data: updateUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const userController = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
}

module.exports = userController