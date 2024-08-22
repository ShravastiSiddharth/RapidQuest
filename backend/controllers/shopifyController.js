const mongoose = require('mongoose');


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
