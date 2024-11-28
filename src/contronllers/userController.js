const User = require('~/models/userModel')

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
    const saveUser = await newUser.save()
    res.status(200).json(saveUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json("Delete successfully")
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json("User not found")
    }
    const updateUser = await User.findByIdAndUpdate(
       req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json("Update successfully")
  } catch (error) {
    res.status(500).json(error)
  }
}

const userController = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
}

module.exports = userController