const router = require('express').Router()
const categoryController = require('~/controllers/categoryController')
const authMiddleware = require('~/middlewares/authMiddleware')

router.post('/create-category', authMiddleware.verifyAdmin, categoryController.createCateory)
router.get('/list-category', categoryController.getAllCategories)
router.put('/update-category/:id', authMiddleware.verifyAdmin, categoryController.updateCategory)
router.delete('/delete-category/:id', authMiddleware.verifyAdmin, categoryController.deleteCategory)

const categoryRoute = router

module.exports = categoryRoute