const Category = require('~/models/categoryModel')

//Tạo mới danh mục
const createNewCategory = async (category) => {
  const newCategory = new Category(category)
  return await newCategory.save()
}

//Lấy danh sách danh mục
const getCategories = async () => {
  return await Category.find().populate('products')
}

//Tìm danh mục theo id
const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId)
} 

//Xóa danh mục theo id
const deleteCategoryById = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId)
}

//Cập nhật danh mục theo id
const updateCategoryById = async (categoryId, category) => {
  return await Category.findByIdAndUpdate(categoryId, { $set: category }, { new: true })
}

module.exports = {
  createNewCategory,
  getCategories,
  findCategoryById,
  deleteCategoryById,
  updateCategoryById
}