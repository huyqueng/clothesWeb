const router = require('express').Router()

const variantController = require('~/controllers/productVariantController.js')
const variantValidation = require('~/validations/productVariantValidation')
const authMiddleware = require('~/middlewares/authMiddleware')

router.post('/create-variant', authMiddleware.verifyAdmin, variantValidation.createNew, variantController.createVariant)
router.get('/variant-list', variantController.getVariants)
router.put('/update-variant/:id', authMiddleware.verifyAdmin, variantValidation.updateVariant, variantController.updateVariant)
router.delete('/delete-variant/:id', authMiddleware.verifyAdmin, variantController.deleteVariant)

const variantRouter = router

module.exports = variantRouter