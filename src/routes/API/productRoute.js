const router = require('express').Router()

const productController = require('~/controllers/productController')
const authMiddleware = require('~/middlewares/authMiddleware')
const upload = require('~/middlewares/uploadMiddleware')

router.post('/create-product', /*authMiddleware.verifyAdmin,*/ upload.array('img',6), productController.createProduct)
router.get('/list-product', /*authMiddleware.verifyAdmin,*/ productController.getAllProducts)
router.put('/update-product/:id', /*authMiddleware.verifyAdmin,*/upload.array('img',6), productController.updateProduct)
router.delete('/delete-product/:id', /*authMiddleware.verifyAdmin,*/ productController.deleteProduct)

const productRoute = router

module.exports = productRoute