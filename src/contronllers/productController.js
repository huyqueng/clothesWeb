const multer = require('multer')
const Category = require('~/models/categoryModel')
// const upload = multer({ dest: 'uploads/' })
const { Product, ProductVariant } = require('~/models/productModel')

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    const saveProduct = await product.save()
    if (req.body.category) {
      const category = await Category.findById(req.body.category)
      if (category) {
        await category.updateOne({ $push: { products: saveProduct._id } })
      }
      else {
        return res.status(404).json({ message: 'Category not exist' })
      }
    }
    res.status(201).json({ message: 'Created new product successfully', data: saveProduct })
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const productController = {
  createProduct,
}

module.exports = productController