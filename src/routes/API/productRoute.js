const router = require('express').Router()

const productController = require('~/contronllers/productController')
const authMiddleware = require('~/middlewares/authMiddleware')
const upload = require('~/middlewares/uploadMiddleware')

router.post('/create-product', /*authMiddleware.verifyAdmin,*/ upload.array('img'), productController.createProduct)
router.get('/list-product', /*authMiddleware.verifyAdmin,*/ productController.getAllProducts)
router.put('/update-product/:id', /*authMiddleware.verifyAdmin,*/ productController.updateProduct)
router.delete('/delete-product/:id', /*authMiddleware.verifyAdmin,*/ productController.deleteProduct)

const productRoute = router

module.exports = productRoute