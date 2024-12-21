const { Product, ProductVariant } = require("~/models/productModel")

const createNewVariant = async (data) => {
  const newVariant = new ProductVariant(data)
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