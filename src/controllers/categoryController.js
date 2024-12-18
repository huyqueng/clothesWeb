const { createNewCategory, getCategories, updateCategoryById, deleteCategoryById, findCategoryById } = require("~/services/categoryService")

const createCateory = async (req, res) => {
  try {
    const saveCategory = await createNewCategory(req.body)
    res.status(200).json({ message: 'Created new category successfully' , data: saveCategory })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories()
    res.status(200).json({ message: 'Got categories successfully' , data: categories })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateCategory = async (req, res) => {
  try {
    const updateCategory = await updateCategoryById(req.params.id, req.body)
    if (!updateCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({ message: 'Updated successfully', data: updateCategory })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await deleteCategoryById(req.params.id)
    if (!deleteCategory) {
      return res.status(404).json({ message:'Category not found'})
    }
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