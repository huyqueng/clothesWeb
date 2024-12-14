  const multer = require('multer')
  const Category = require('~/models/categoryModel')
  // const upload = multer({ dest: 'uploads/' })
  const { Product, ProductVariant } = require('~/models/productModel')

  const createProduct = async (req, res) => {
    try {
      const filePath = req.files && req.files[0] ? req.files[0].path : null;
      const product = new Product({
        ...req.body,
        img: filePath
      })
      const saveProduct = await product.save()
      if (req.body.category) {
        const category = await Category.findById(req.body.category)
        if (category) {
          await category.updateOne({ $push: { products: saveProduct._id } })
        }
        else {
          return res.status(404).json({ message: 'Category not found' })
        }
      }
      res.status(201).json({ message: 'Product created successfully', data: saveProduct })
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
      const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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