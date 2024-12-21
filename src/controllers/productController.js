const { createNewProduct, addProductToCategory, getProducts, removeImg, updateProductById, findProductById, deleteProductById } = require('~/services/productService')

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
  deleteProduct
}

module.exports = productController