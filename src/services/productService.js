const { Product } = require('~/models/productModel')
const { findCategoryById } = require('./categoryService')
const fs = require('fs')

//Tạo sản phẩm
const createNewProduct = async (product, filePaths) => {
  const newProduct = new Product({
    ...product,
    img: filePaths
  })
  return await newProduct.save()
}

//Đưa sản phẩm vào danh mục sản phẩm
const addProductToCategory = async (categoryId, productId) => {
    const category = await findCategoryById(categoryId)
    if (!category) {
      throw new Error('Không tìm thấy danh mục sản phẩm')
    }
    await category.updateOne({ $push: { products: productId } })
}

//Lấy danh sách sản phẩm
const getProducts = async () => {
  return await Product.find()
}

//Tìm sản phẩm theo id
const findProductById = async (productId) => {
  return await Product.findById(productId)
}

//Tìm sản phẩm theo id danh mục sản phẩm
const findProductByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId })
}

//Thay thế, xóa ảnh nếu cập nhật hình ảnh sản phẩm, xóa sản phẩm
const removeImg = (images) => {
  images.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${filePath}`, err);
      }
    })
  })
}

//Cập nhật sản phẩm theo id
const updateProductById = async (productId, updateFields) => {
  return await Product.findByIdAndUpdate(productId, { $set: updateFields }, { new: true })
}

//Xóa sản phẩm theo id
const deleteProductById = async (productId) => {
  return await Product.findByIdAndDelete(productId)
}



module.exports = {
  createNewProduct,
  addProductToCategory,
  getProducts,
  findProductById,
  removeImg,
  updateProductById,
  deleteProductById,
  findProductByCategory
}