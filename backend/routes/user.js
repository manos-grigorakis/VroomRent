const express = require("express");
const router = express.Router();
const {
  userById,
  getUserBookings,
  getBookingById,
  updateUserProfile,
  uploadAvatar,
  deleteUserById,
} = require("../controllers/userController");

router.post("/profile/upload-avatar", uploadAvatar);
router.get("/profile/:id", userById);
router.patch("/profile/:id", updateUserProfile);

router.get("/bookings/:id", getUserBookings);
router.get("/bookings/booking/:id", getBookingById);
router.post("/profile/upload-avatar", uploadAvatar);
router.delete("/profile/:id", deleteUserById);

module.exports = router;
