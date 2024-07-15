const express = require("express");
const router = express.Router();

const {
  getBookingExtras,
  getVehicles,
  getVehicleById,
  createBooking,
  createPaymentIntent,
  cancelPaymentIntent,
} = require("../controllers/apiController");

router.get("/bookingExtras", getBookingExtras);
router.get("/vehicles", getVehicles);
router.get("/vehicle/:id", getVehicleById);
router.post("/create-booking", createBooking);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/cancel-payment-intent", cancelPaymentIntent);

module.exports = router;
