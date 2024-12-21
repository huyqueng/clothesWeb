const router = require('express').Router()

const variantController = require('~/controllers/productVariantController.js')
const variantValidation = require('~/validations/productVariantValidation')

router.post('/create-variant', variantValidation.createNew, variantController.createVariant)
router.get('/variant-list', variantController.getVariants)
router.put('/update-variant/:id', variantValidation.updateVariant, variantController.updateVariant)
router.delete('/delete-variant/:id', variantController.deleteVariant)

const variantRouter = router

module.exports = variantRouter