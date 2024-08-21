const mongoose = require('mongoose');

const LineItemSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.Number,
  variant_id: mongoose.Schema.Types.Number,
  title: String,
  quantity: Number,
  price: Number,
  fulfillment_status: String,
});

const ShopifyOrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  id: mongoose.Schema.Types.Number,
  email: String,
  created_at: String,
  updated_at: String,
  total_price: String,
  subtotal_price: String,
  total_weight: Number,
  total_tax: String,
  financial_status: String,
  name: String,
  currency: String,
  line_items: [LineItemSchema],
  customer: {
    id: mongoose.Schema.Types.Number,
    email: String,
    first_name: String,
    last_name: String,
  },
});

module.exports = mongoose.model('ShopifyOrder', ShopifyOrderSchema);
