const Category = require('~/models/categoryModel')
const { Product, ProductVariant } = require('~/models/productModel')
const { createNewProduct, addProductToCategory } = require('~/services/productService')

const createProduct = async (req, res) => {
  try {
    const filePaths = req.files.map(file => file.path) || []
    const product = await createNewProduct(req.body, filePaths)
    if (req.body.category) {
      try {
        await addProductToCategory(req.body.category, product._id)
      } catch (error) {
        return res.status(404).json({ message: error.message })
      }
    }
    res.status(201).json({ message: 'Product created successfully', data: product })
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let updateFields = { ...req.body }
    if (req.files) {
      const newImgPaths = req.files.map(file => file.path)
      updateFields.img = newImgPaths
    }    
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    )
    res.status(200).json({ message: 'Updated successfully', data: updateProduct })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}
const productController = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
}
module.exports = productController