const express = require('express');
const { getTotalSales } = require('../controllers/orderController');
const router = express.Router();

router.get('/sales', getTotalSales);

module.exports = router;
