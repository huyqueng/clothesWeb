const Order = require('~/models/order');
const { Product } = require('~/models/productModel')

//Đặt hàng
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    const totalPrice = product.price * quantity;
    const order = new Order({ product: productId, quantity, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Lấy danh sách toàn bộ đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Cập nhật trạng thái
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
