const express = require("express");
const router = express.Router();

const {
  getBookingExtras,
  getVehicles,
  getVehicleById,
  createBooking,
  createPaymentIntent,
  sendReceiptEmail,
  getOffers,
  contactMail,
} = require("../controllers/apiController");

router.get("/bookingExtras", getBookingExtras);
router.get("/vehicles", getVehicles);
router.get("/vehicle/:id", getVehicleById);
router.post("/create-booking", createBooking);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/send-receipt-email", sendReceiptEmail);
router.get("/offers", getOffers);
router.post("/contact-mail", contactMail);

module.exports = router;
