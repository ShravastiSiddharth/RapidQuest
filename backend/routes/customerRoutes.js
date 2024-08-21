const express = require('express');
const router = express.Router();
const { getNewCustomersOverTime, getRepeatCustomers, getCustomerDistribution, getCustomerLifetimeValue } = require('../controllers/customerController');

// Route for tracking new customers added over time (POST request)
router.post('/new-customers',getNewCustomersOverTime);

// Route for identifying repeat customers (POST request)
router.post('/repeat-customers', getRepeatCustomers);

// Route for visualizing geographical distribution of customers (POST request)
router.post('/geographical-distribution', getCustomerDistribution);

// Route for calculating customer lifetime value by cohorts (POST request)
router.post('/customer-lifetime-value', getCustomerLifetimeValue);

module.exports = router;
