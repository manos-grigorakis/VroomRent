const express = require("express");
const router = express.Router();
const {
  register,
  login,
  registrationEmail,
  requestResetPassword,
  resetPassword,
  checkToken,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/registration-email", registrationEmail);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);
router.post("/check-token", checkToken);

module.exports = router;
