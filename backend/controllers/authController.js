const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const transporter = require("../config/nodemailer");
const fs = require("fs"); // read files
const path = require("path");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    // Hashing password with 10 salted rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new userModel
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Saving user to db
    await newUser.save();

    res
      .status(201)
      .send({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "User registration failed.", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Wrong password for user:", email);
      return res.status(400).send({ message: "Wrong Password" });
    }

    res.status(200).send({ message: "You are now logged in", user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login Failed", error });
  }
};

exports.registrationEmail = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    // Read HTML file
    const filePath = path.join(__dirname, "../config/welcomeMail.html");
    let htmlContent = fs.readFileSync(filePath, "utf-8");

    // Replace placeholders with actual values using a global regular expression
    htmlContent = htmlContent.replace(/{{firstName}}/g, firstName);
    htmlContent = htmlContent.replace(/{{lastName}}/g, lastName);
    htmlContent = htmlContent.replace(/{{email}}/g, email);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "🎉  Welcome to VroomRent!",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // if user exists create a token which will expire in 1 hour
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // save token to db
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

    // Read HTML file
    const filePath = path.join(__dirname, "../config/resetPasswordMail.html");
    let htmlContent = fs.readFileSync(filePath, "utf-8");

    // Replace placeholders with actual values
    htmlContent = htmlContent.replace("{{firstName}}", user.firstName);
    htmlContent = htmlContent.replace("{{lastName}}", user.lastName);
    htmlContent = htmlContent.replace("{{resetUrl}}", resetUrl);

    // Configuration of email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Password reset email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, oldPassword, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    if (user.resetTokenExpiration < Date.now()) {
      return res.status(400).send({ message: "Token has expired" });
    }

    // Compares password in database with entered value of oldpassword
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).send({ message: "Old password doesn't match" });
    }

    // Validation of token
    jwt.verify(token, secretKey);

    // Hashing password with 10 salted rounds
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    res.send("Password has been reset successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.checkToken = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await userModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).send({ valid: false, message: "Invalid token" });
    }

    if (user.resetTokenExpiration < Date.now()) {
      return res
        .status(400)
        .send({ valid: false, message: "Token has expired" });
    }

    res.send({ valid: true });
  } catch (error) {
    console.error(error);
    res.status(500)({
      valid: false,
      message: "Server error",
      error: error.message,
    });
  }
};
