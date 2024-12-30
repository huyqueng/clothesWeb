const { hashPassword } = require('~/services/authService')
const { getUsers, findUserById, createNewUser, deleteUserById, updateUserById } = require('~/services/userService')

//Tạo mới tài khoản người dùng (chỉ admin có quyền)
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
    res.status(200).json({ message: 'Tạo mới thành công người dùng' , data: user })
  } catch (error) {
    res.status(500).json({ message:'Lỗi hệ thống', error: error })
  }
}

//Lấy danh sách tài khoản người dùng (chỉ admin có quyền)
const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json({ message: 'Lấy danh sách người dùng thành công', data:users })
  } catch (error) {
    res.status(500).json({ message:'Lỗi hệ thống', error: error })
  }
}

//Xóa tài khoản người dùng (chỉ có admin mới có quyền)
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await deleteUserById(req.params.id)
    if (!deleteUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' })
    }
    res.status(200).json({ message: 'Xóa thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Cập nhật thông tin tài khoản người dùng (chỉ có admin mới có quyền)
const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body)
    if (!updateUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' })
    }
    res.status(200).json({ message: 'Cập nhật thành công', data: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Lấy thông tin người dùng
const getUserInfor = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await updateUserById(userId)
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Người dùng thay đổi thông tin tài khoản
const updateMyInfor = async (req, res) => {
  try {
    const userId = req.user.id
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password)
    }
    const updatedUser = await updateUserById(userId, req.body)
    res.status(200).json({ message: 'Cập nhật thành công', data: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

const userController = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserInfor,
  updateMyInfor
}

module.exports = userController