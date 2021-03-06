const express = require('express');
const router = express.Router();

const ordersHandler = require('./handlers/order');

router.get('/', ordersHandler.getOrders);

module.exports = router;