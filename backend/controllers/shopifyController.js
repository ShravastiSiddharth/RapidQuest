const mongoose = require('mongoose');

// Function to fetch data from shopifyCustomers collection
const getCustomers = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const customers = await db.collection('shopifyCustomers').find({}).toArray();
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to fetch data from shopifyOrders collection
const getOrders = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const orders = await db.collection('shopifyOrders').find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to fetch data from shopifyProducts collection
const getProducts = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const products = await db.collection('shopifyProducts').find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCustomers,
  getOrders,
  getProducts,
};
