const { createNewVariant, getVariantsByProductId, updateVariantById, deleteVariantById } = require("~/services/productVariantService")

//Tạo biến thể sản phẩm (chỉ admin có quyền)
const createVariant = async (req, res) => {
  try {  
    const variant = await createNewVariant(req.body)
    return res.status(201).json({ message: 'Tạo mới thành công', data: variant })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Lấy/lọc danh sách biến thể theo mã sản phẩm, size, màu
const getVariants = async (req, res) => {
  try {
    const { productId, size, color } = req.query
    if (!productId) {
      return res.status(400).json({ message: 'Mã sản phẩm không hợp lệ' });
    }
    const filter = { productId }
    if(size) filter.size = size
    if(color) filter.color = color
    const variants = await getVariantsByProductId(filter)
    res.status(200).json({ message:'Lấy danh sách biến thể sản phẩm thành công', data: variants })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Cập nhật thông tin biến thể của sản phẩm (chỉ admin có quyền)
const updateVariant = async (req, res) => {
  try {
    const updatedVariant = await updateVariantById(req.params.id, req.body)
    if (!updatedVariant) {
      return res.status(400).json({ message:'Variant not found' })
    }
    res.status(200).json({ message: 'Cập nhật thành công', data: updatedVariant })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

//Xóa biến thể của sản phẩm (chỉ admin có quyền)
const deleteVariant = async (req, res) => {
  try {
    const deletedVariant = await deleteVariantById(req.params.id)
    if (!deletedVariant) {
      return res.status(400).json({ message:'Không tìm thấy biến thể' })
    }
    res.status(200).json({ message: 'Xóa thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error })
  }
}

const variantController = {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant
}

module.exports = variantController