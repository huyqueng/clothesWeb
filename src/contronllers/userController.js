const User = require('~/models/userModel')
const { hashPassword } = require('~/services/authService')
const { getAllUsers, findUserById, createNewUser, deleteUserById, updateUserById } = require('~/services/userService')

const createUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    const user = await createNewUser({
      username: req.body.username,
      password: hashedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role 
    })
    res.status(200).json({ message: 'Created new user successfully' , data: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message:'Internal Server Error', error: error })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ message: 'Got users successfully', data:users })
  } catch (error) {
    res.status(500).json({ message:'Internal Server Error', error: error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await deleteUserById(req.params.id)
    if (!deleteUser) {
      return res.status(404).json("User not found")
    }
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateUser = async (req, res) => {
  try {
    const updateUser = await updateUserById(req.params.id, req.body)
    if (!updateUser) {
      return res.status(404).json("User not found")
    }
    res.status(200).json({ message: 'Updated successfully', data: updateUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const userController = {
  createUser,
  getUsers,
  deleteUser,
  updateUser
}

module.exports = userController