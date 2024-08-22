const express = require('express');
const router = express.Router();
const { getNewCustomersOverTime, getRepeatCustomers, getCustomerDistribution, getCustomerLifetimeValue } = require('../controllers/customerController');


router.post('/new-customers',getNewCustomersOverTime);


router.post('/repeat-customers', getRepeatCustomers);


router.post('/geographical-distribution', getCustomerDistribution);


router.post('/customer-lifetime-value', getCustomerLifetimeValue);

module.exports = router;
