const { addNewItem, getItems, updateQuantity, deleteItem } = require("~/services/cartService")

//Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id 
    const { variantId, quantity } = req.body
    const cart = await addNewItem(userId, variantId, quantity) 
    res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', data: cart })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

//Xem giỏ hàng (xem thông tin các sản phẩm trong giỏ hàng)
const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await getItems(userId)
    res.status(200).json({ data: cart })
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

//Cập nhật sản phẩm trong giỏ hàng(cập nhật số lượng)
const updateCartItems = async (req, res) => {
  try {
    const userId = req.user.id
    const { variantId, newQuantity } = req.body
    const updatedCart = await updateQuantity(userId, variantId, newQuantity)
    res.status(200).json({ data: updatedCart })
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

//Xóa sản phẩm trong giỏ
const deleteCartItems = async (req, res) => {
  try {
    const userId = req.user.id
    const variantId = req.body
    const deletedCart = await deleteItem(userId, variantId)
    res.status(200).json({ data: deletedCart })
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error })
  }
}

const cartController = {
  addToCart,
  getCart,
  updateCartItems,
  deleteCartItems
}

module.exports = cartController