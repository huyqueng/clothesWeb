const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
