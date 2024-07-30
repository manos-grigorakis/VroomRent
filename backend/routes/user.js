const express = require("express");
const router = express.Router();
const {
  userById,
  getUserBookings,
  getBookingById,
  resetPassword,
} = require("../controllers/userController");

router.get("/profile/:id", userById);
router.get("/bookings/:id", getUserBookings);
router.get("/bookings/booking/:id", getBookingById);

module.exports = router;
