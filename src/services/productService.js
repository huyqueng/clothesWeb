const { Product } = require('~/models/productModel')
const { findCategoryById } = require('./categoryService')
const fs = require('fs')

const createNewProduct = async (product, filePaths) => {
  const newProduct = new Product({
    ...product,
    img: filePaths
  })
  return await newProduct.save()
}

//Add product to category
const addProductToCategory = async (categoryId, productId) => {
    const category = await findCategoryById(categoryId)
    if (!category) {
      throw new Error('Category not found')
    }
    await category.updateOne({ $push: { products: productId } })
}

const getProducts = async () => {
  return await Product.find()
}

const findProductById = async (productId) => {
  return await Product.findById(productId)
}

const findProductByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId })
}

//Alter or delete product images when a product is updated or deleted
const removeImg = (images) => {
  images.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${filePath}`, err);
      }
    })
  })
}

const updateProductById = async (productId, updateFields) => {
  return await Product.findByIdAndUpdate(productId, { $set: updateFields }, { new: true })
}

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