const { Product } = require('~/models/productModel')
const { findCategoryById } = require('./categoryService')

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

module.exports = {
  createNewProduct,
  addProductToCategory,
  getProducts
}