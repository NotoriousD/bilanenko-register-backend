const express = require('express');
const router = express.Router();
const { createOrder, getOrders, createInvoice, updatedOrder } = require('./orders.controller');
const { getPackageById } = require('../packages/packages.controller');

router.get('/', getOrders);
router.post('/create', getPackageById, createOrder, createInvoice);
router.post('/cb', updatedOrder);

module.exports = router;