const Category = require('~/models/categoryModel')

const createCateory = async (req, res) => {
  try {
    const newCategory = new Category(req.body)
    const saveCategory = await newCategory.save()
    res.status(200).json({ message: 'Created new category successfully' , data: saveCategory })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('products')
    res.status(200).json({ message: 'Got categories successfully' , data: categories })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    const updateCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json({ message: 'Updated successfully', data: updateCategory })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    const deleteCategory = await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const categoryController = {
  createCateory,
  getAllCategories,
  updateCategory,
  deleteCategory
}

module.exports = categoryController