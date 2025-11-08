const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  total: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
