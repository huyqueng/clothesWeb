const { ProductVariant } = require("~/models/productModel")

//Tạo mới biến thể
const createNewVariant = async (variant) => {
  const newVariant = new ProductVariant(variant)
  return await newVariant.save()
}

//Lấy danh sách biến thể theo mã sản phẩm
const getVariantsByProductId = async (filter) => {
  return await ProductVariant.find(filter).populate('productId', 'name')
}

//Cập nhật biến thể
const updateVariantById = async (variantId, variant) => {
  return await ProductVariant.findByIdAndUpdate(variantId, { $set: variant }, { new: true })
}

//Xóa biến thể
const deleteVariantById = async (variantId) => {
  return await ProductVariant.findByIdAndDelete(variantId)
}

module.exports = {
  createNewVariant,
  getVariantsByProductId,
  updateVariantById,
  deleteVariantById
}