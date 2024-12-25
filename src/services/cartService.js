const Cart = require("~/models/cartModel")
const { ProductVariant } = require("~/models/productModel")

//add new item to cart
const addNewItem = async (userId, variantId, quantity) => {
  const variant = await ProductVariant.findById(variantId).populate('productId')
  const price = variant.productId.price
  const productId = variant.productId
  const productName = variant.productId.name
  const img = variant.productId.img[0]
  const size = variant.size
  const color = variant.color
  
  let cart = await Cart.findOne({ userId }).populate()
  //Don't have any item in cart
  if (!cart) {
    cart = new Cart({
      userId, 
      items: [{ productId, productName, img, variantId, size, color, quantity, price }],
      totalPrice: quantity * price
    })
    return await cart.save()
  }
  //Check item in cart
  const existingItem = cart.items.findIndex(item => item.variantId.toString() === variantId)
  if (existingItem !== -1) {
    cart.items[existingItem].quantity += quantity
  }
  else {
    cart.items.push({ productId, productName, img, variantId, size, color, quantity, price })
  }
  //Calculate total price
  if(cart.items.length>0)
    cart.totalPrice = calculateTotalPrice(cart.items)
  else {
    cart.totalPrice = 0
  }
  return await cart.save()
}

//Calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((total,item) => total + item.quantity * item.price, 0)
}

//Get item in cart
const getItems = async (userId) => {
  return await Cart.findOne({ userId })
}

//Update quantity
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

//Remove item from cart
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