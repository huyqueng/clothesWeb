const Cart = require("~/models/cartModel")
const { ProductVariant } = require("~/models/productModel")

//Thêm mới item vào giỏ hàng
const addNewItem = async (userId, variantId, quantity) => {
  const variant = await ProductVariant.findById(variantId).populate('productId')
  const price = variant.productId.price
  const productId = variant.productId
  const productName = variant.productId.name
  const img = variant.productId.img[0] //Lấy ảnh đầu tiên trong mảng
  const size = variant.size
  const color = variant.color
  
  let cart = await Cart.findOne({ userId }).populate()
  //Nếu sản phẩn chưa có trong giỏ hàng 
  if (!cart) {
    cart = new Cart({
      userId, 
      items: [{ productId, productName, img, variantId, size, color, quantity, price }],
      totalPrice: quantity * price
    })
    return await cart.save()
  }
  //Kiểm tra đã tồn tại sản phẩm trong giỏ hàng chưa
  const existingItem = cart.items.findIndex(item => item.variantId.toString() === variantId)
  if (existingItem !== -1) { 
    cart.items[existingItem].quantity += quantity //Tăng số lượng lên 1
  }
  else {
    cart.items.push({ productId, productName, img, variantId, size, color, quantity, price })
  }
  //Tính tổng tiền
  if(cart.items.length>0)
    cart.totalPrice = calculateTotalPrice(cart.items)
  else {
    cart.totalPrice = 0
  }
  return await cart.save()
}

//Tính tổng tiền
const calculateTotalPrice = (items) => {
  return items.reduce((total,item) => total + item.quantity * item.price, 0)
}

//Xem giỏ hàng
const getItems = async (userId) => {
  return await Cart.findOne({ userId })
}

//Cập nhật giỏ hàng (sửa số lượng)
const updateQuantity = async (userId, variantId, newQuantity) => {
  const cart = await Cart.findOne({ userId })
  const item = cart.items.findIndex(item => item.variantId.toString() === variantId)
  if (newQuantity < 1) {
    cart.items.splice(item, 1)
  } else {
    cart.items[item].quantity = newQuantity
  }
  if(cart.items.length>0)
    cart.totalPrice = calculateTotalPrice(cart.items)
  else {
    cart.totalPrice = 0
  }
  return await cart.save()
}

//Xóa sản phẩm khỏi giỏ hàng
const deleteItem = async (userId, variantId) => {
  const cart = await Cart.findOne({ userId })
  const item = cart.items.findIndex(item => item.variantId.toString() === variantId)
  cart.items.splice(item, 1)
  if(cart.items.length>0)
    cart.totalPrice = calculateTotalPrice(cart.items)
  else {
    cart.totalPrice = 0
  }
  return await cart.save()
}

module.exports = {
  addNewItem,
  calculateTotalPrice,
  getItems,
  updateQuantity,
  deleteItem
}