const express = require("express");
const router = express.Router();
const {
  register,
  login,
  registrationEmail,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/registration-email", registrationEmail);

module.exports = router;
