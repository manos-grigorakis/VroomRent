const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Cancelled"],
    default: "In Progress",
  },
  billingDetails: {
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  bookDetails: {
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
    },
    pickupDate: {
      type: String,
      required: true,
    },
    dropoffDate: {
      type: String,
      required: true,
    },
  },
  stripeTranscactionId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  bookingExtrasId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookingextras",
  },
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
