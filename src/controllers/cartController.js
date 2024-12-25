const { addNewItem, getItems, updateQuantity, deleteItem } = require("~/services/cartService")

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id 
    const { variantId, quantity } = req.body
    const cart = await addNewItem(userId, variantId, quantity) 
    res.status(200).json({ message: 'Added product to the cart successfully', data: cart })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await getItems(userId)
    res.status(200).json({ data: cart })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

const updateCartItems = async (req, res) => {
  try {
    const userId = req.user.id
    const { variantId, newQuantity } = req.body
    const updatedCart = await updateQuantity(userId, variantId, newQuantity)
    res.status(200).json({ data: updatedCart })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

const deleteCartItems = async (req, res) => {
  try {
    const userId = req.user.id
    const variantId = req.body
    const deletedCart = await deleteItem(userId, variantId)
    res.status(200).json({ data: deletedCart })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error })
  }
}

const cartController = {
  addToCart,
  getCart,
  updateCartItems,
  deleteCartItems
}

module.exports = cartController