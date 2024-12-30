const { createNewCategory, getCategories, updateCategoryById, deleteCategoryById, findCategoryById } = require("~/services/categoryService")

//Tạo mới danh mục sản phẩm (Chỉ admin có quyền)
const createCateory = async (req, res) => {
  try {
    const saveCategory = await createNewCategory(req.body)
    res.status(200).json({ message: 'Tạo mới danh mục sản phẩm thành công' , data: saveCategory })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Lấy danh sách danh mục sản phẩm
const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories()
    res.status(200).json({ message: 'Lấy danh sách danh mục sản phẩm thành công' , data: categories })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Cập nhật danh mục sản phẩm(chỉ admin có quyền)
const updateCategory = async (req, res) => {
  try {
    const updateCategory = await updateCategoryById(req.params.id, req.body)
    if (!updateCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' })
    }
    res.status(200).json({ message: 'Cập nhật thành công', data: updateCategory })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Xóa danh mục sản phẩm(chỉ admin có quyền)
const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await deleteCategoryById(req.params.id)
    if (!deleteCategory) {
      return res.status(404).json({ message:'Không tìm thấy danh mục'})
    }
    res.status(200).json({ message: 'Xóa thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

const categoryController = {
  createCateory,
  getAllCategories,
  updateCategory,
  deleteCategory
}

module.exports = categoryController