const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    enum: ["Small", "Medium", "Large", "SUV", "4x4", "Luxurious", "City"],
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  details: {
    passengers: {
      type: Number,
      min: 0,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    fuel: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric"],
      required: true,
    },
    storage: {
      bigCase: {
        type: Number,
        min: 0,
        required: true,
      },
      smallCase: {
        type: Number,
        min: 0,
        required: true,
      },
    },
  },
  premiumDelivery: {
    type: Boolean,
    default: false,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    min: 0,
  },
});

const Vehicle = new mongoose.model("Vehicle", vehicleSchema, "vehicles");

module.exports = Vehicle;
