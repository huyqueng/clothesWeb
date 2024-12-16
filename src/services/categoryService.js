const Category = require('~/models/categoryModel')

const createNewCategory = async (category) => {
  const newCategory = new Category(category)
  return await newCategory.save()
}

const getCategories = async () => {
  return await Category.find().populate('products')
}

const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId)
} 

const deleteCategoryById = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId)
}

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