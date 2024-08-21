const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.Number,
  customer_id: mongoose.Schema.Types.Number,
  first_name: String,
  last_name: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  province_code: String,
  country_code: String,
  country_name: String,
  default: Boolean,
});

const ShopifyCustomerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  addresses: [AddressSchema],
  admin_graphql_api_id: String,
  created_at: String,
  currency: String,
  default_address: AddressSchema,
  email: String,
  email_marketing_consent: {
    state: String,
    opt_in_level: String,
    consent_updated_at: String,
  },
  first_name: String,
  last_name: String,
  last_order_id: mongoose.Schema.Types.Number,
  last_order_name: String,
  multipass_identifier: String,
  note: String,
  orders_count: Number,
  phone: String,
  sms_marketing_consent: String,
  state: String,
  tags: String,
  tax_exempt: Boolean,
  tax_exemptions: Array,
  total_spent: String,
  updated_at: String,
  verified_email: Boolean,
});

module.exports = mongoose.model('ShopifyCustomer', ShopifyCustomerSchema);
