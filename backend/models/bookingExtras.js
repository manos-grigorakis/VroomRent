const mongoose = require("mongoose");

const bookingExtrasSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});

const bookingExtras = new mongoose.model("bookingExtras", bookingExtrasSchema);

module.exports = bookingExtras;
