const router = require('express').Router()

const productController = require('~/contronllers/productController')
const authMiddleware = require('~/middlewares/authMiddleware')

router.post('/create-product', productController.createProduct)

const productRoute = router

module.exports = productRoute