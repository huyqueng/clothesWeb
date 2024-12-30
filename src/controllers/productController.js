const { createNewProduct, addProductToCategory, getProducts, removeImg, updateProductById, findProductById, deleteProductById, findProductByCategory } = require('~/services/productService')
const { getVariantsByProductId } = require('~/services/productVariantService')

//Tạo mới sản phẩm (chỉ admin có quyền)
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
    res.status(201).json({ message: 'Tạo mới sản phẩm thành công', data: product })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Lấy toàn bộ danh sách sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts()
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Lấy toàn bộ sản phẩm theo danh mục sản phẩm
const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    if (!categoryId) {
      return res.status(400).json({ message: 'Không tìm thấy danh mục sản phẩm' })
    }
    const products = await findProductByCategory(categoryId)
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Không có sản phẩm nào trong danh mục' });
    }
    res.status(200).json({ data: products })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Xem chi tiết thông tin(biến thể) sản phẩm
const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await findProductById(req.params.id)
    if (!product) {
      return res.status(400).json({ message: 'Không tìm thấy sản phẩm' })
    }
    const variants = await getVariantsByProductId({ productId })
    res.status(200).json({ data: { product, variants } })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Cập nhật thông tin sản phẩm (chỉ admin có quyền)
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
      return res.status(400).json({ message: 'Không tìm thấy sản phẩm' })
    }
    res.status(200).json({ message: 'Cập nhật thành công', data: updatedProduct })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Xóa sản phẩm (chỉ admin có quyền)
const deleteProduct = async (req, res) => {
  try {
    const product = await deleteProductById(req.params.id)
    if (!product) {
      return res.status(400).json({ message: 'Không tìm thấy sản phẩm' })
    }
    if (product.img) {
      removeImg(product.img)
    }
    res.status(200).json({ message: 'Xóa thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
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