const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const {authorization} = require('../middlewares/isAdmin');

router.get('/orders', authorization(['customer','admin']), orderController.getOrders);

router.get('/orders/:id', authorization(['customer','admin']), orderController.getOrderById);

router.get('/orders/user/:userId',authorization(['customer','admin']), orderController.getOrderByUserId);

router.post('/order', authorization(['customer','admin']), orderController.createOrder);

router.patch('/order/:id', authorization(['customer','admin']), orderController.updateOrder);


module.exports = router;
