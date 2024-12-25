const router = require('express').Router()

const cartController = require('~/controllers/cartController')
const authMiddleware = require('~/middlewares/authMiddleware')

router.post('/add-to-cart', authMiddleware.verifyToken, cartController.addToCart)
router.get('/cart', authMiddleware.verifyToken, cartController.getCart)
router.put('/update-quantity', authMiddleware.verifyToken, cartController.updateCartItems)
router.delete('/cart', authMiddleware.verifyToken, cartController.deleteCartItems)

const cartRoute = router

module.exports = cartRoute