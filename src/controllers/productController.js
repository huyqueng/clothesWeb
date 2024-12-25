const { createNewProduct, addProductToCategory, getProducts, removeImg, updateProductById, findProductById, deleteProductById, findProductByCategory } = require('~/services/productService')
const { getVariantsByProductId } = require('~/services/productVariantService')

const createProduct = async (req, res) => {
  try {
    const filePaths = req.files.map(file => file.path) 
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
    const products = await getProducts()
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    if (!categoryId) {
      return res.status(400).json({ message: 'Category not found' })
    }
    const products = await findProductByCategory(categoryId)
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products found for this category' });
    }
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await findProductById(req.params.id)
    if (!product) {
      return res.status(400).json({ message: 'Product not found' })
    }
    const variants = await getVariantsByProductId({ productId })
    res.status(200).json({ data: { product, variants } })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await findProductById(req.params.id)
    let updateFields = { ...req.body }
    if (!req.files || req.files.length === 0) {
      updateFields.img = product.img;
    } else {
      if (product.img) {
        removeImg(product.img)
      }
      const newImgPaths = req.files.map(file => file.path)
      updateFields.img = newImgPaths
    }
    const updatedProduct = await updateProductById(req.params.id, updateFields)
    if (!updatedProduct) {
      return res.status(400).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Updated successfully', data: updatedProduct })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await deleteProductById(req.params.id)
    if (!product) {
      return res.status(400).json({ message: 'Product not found' })
    }
    if (product.img) {
      removeImg(product.img)
    }
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const productController = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductDetails
}

module.exports = productController