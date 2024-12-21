const router = require('express').Router()

const productController = require('~/controllers/productController')
const authMiddleware = require('~/middlewares/authMiddleware')
const upload = require('~/middlewares/uploadMiddleware')
const productValidation = require('~/validations/productValidation')

router.post('/create-product', /*authMiddleware.verifyAdmin,*/ upload.array('img',6), productValidation.createNew, productController.createProduct)
router.get('/list-product', /*authMiddleware.verifyAdmin,*/ productController.getAllProducts)
router.put('/update-product/:id', /*authMiddleware.verifyAdmin,*/ productValidation.updateProduct, upload.array('img',6), productController.updateProduct)
router.delete('/delete-product/:id', /*authMiddleware.verifyAdmin,*/ productController.deleteProduct)

const productRoute = router

module.exports = productRoute