const { createNewVariant, getVariantsByProductId, updateVariantById, deleteVariantById } = require("~/services/productVariantService")

const createVariant = async (req, res) => {
  try {  
    const variant = await createNewVariant(req.body)
    return res.status(201).json({ message: 'Created successfully', data: variant })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const getVariants = async (req, res) => {
  try {
    const { productId, size, color } = req.query
    if (!productId) {
      return res.status(400).json({ message: 'Invalid productId' });
    }
    const filter = { productId }
    if(size) filter.size = size
    if(color) filter.color = color
    const variants = await getVariantsByProductId(filter)
    res.status(200).json({ message:'Got variants successfully', data: variants })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateVariant = async (req, res) => {
  try {
    const updatedVariant = await updateVariantById(req.params.id, req.body)
    if (!updatedVariant) {
      return res.status(400).json({ message:'Variant not found' })
    }
    res.status(200).json({ message: 'Updated successfully', data: updatedVariant })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const deleteVariant = async (req, res) => {
  try {
    const deletedVariant = await deleteVariantById(req.params.id)
    if (!deletedVariant) {
      return res.status(400).json({ message:'Variant not found' })
    }
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const variantController = {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant
}

module.exports = variantController