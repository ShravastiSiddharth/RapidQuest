const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.Number,
  product_id: mongoose.Schema.Types.Number,
  name: String,
  position: Number,
  values: [String],
});

const VariantSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.Number,
  product_id: mongoose.Schema.Types.Number,
  title: String,
  price: Number,
});

const ShopifyProductsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  admin_graphql_api_id: String,
  created_at: String,
  handle: String,
  id: mongoose.Schema.Types.Number,
  product_type: String,
  status: String,
  title: String,
  updated_at: String,
  options: [OptionSchema],
  variants: [VariantSchema],
  vendor: String,
});

module.exports = mongoose.model('ShopifyProducts', ShopifyProductSchema);
