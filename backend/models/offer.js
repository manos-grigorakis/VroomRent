const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  img: {
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
  details: {
    type: [String],
    required: true,
  },
  ctaText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  discountCode: {
    type: String,
    required: true,
    uppercase: true,
  },
  discountValue: {
    type: Number,
    min: 0,
    default: null,
  },
  conditions: [
    {
      type: { type: String, required: true },
      value: { type: mongoose.Mixed, required: true },
    },
  ],
});

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
