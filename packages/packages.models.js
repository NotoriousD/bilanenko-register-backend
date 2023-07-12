const mongoose = require('mongoose');
const { Schema } = mongoose;

const packagesSchema = new Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model('packages', packagesSchema);