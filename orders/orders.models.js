const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
  email: String,
  fullName: String,
  course_id: ObjectId,
  total_amount: Number,
  order_status: String,
  invoice_id: String,
  created_date: Date,
  paied_date: Date,
});

module.exports = mongoose.model('orders', ordersSchema);