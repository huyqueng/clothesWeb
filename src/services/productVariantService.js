const { ProductVariant } = require("~/models/productModel")

const createNewVariant = async (variant) => {
  const newVariant = new ProductVariant(variant)
  return await newVariant.save()
}

const getVariantsByProductId = async (filter) => {
  return await ProductVariant.find(filter).populate('productId', 'name')
}

const updateVariantById = async (variantId, variant) => {
  return await ProductVariant.findByIdAndUpdate(variantId, { $set: variant }, { new: true })
}

const deleteVariantById = async (variantId) => {
  return await ProductVariant.findByIdAndDelete(variantId)
}

module.exports = {
  createNewVariant,
  getVariantsByProductId,
  updateVariantById,
  deleteVariantById
}