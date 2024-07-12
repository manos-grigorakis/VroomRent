require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const userModel = require("./models/user");
const vehicleModel = require("./models/vehicle");
const bookingExtrasModel = require("./models/bookingExtras");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    // Hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
      .send({ message: "User registered sucessfully!", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "User registration failed.", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Wrong password for user:", email);
      return res.status(400).send({ message: "Wrong Passoword" });
    }

    res.status(200).send({ message: "You are now logged in", user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login Failed", error });
  }
});

app.get("/bookingExtras", async (req, res) => {
  try {
    const bookingExtras = await bookingExtrasModel.find({});
    res.status(200).send(bookingExtras);
  } catch (error) {
    console.error(error);
  }
});

app.get("/vehicles", async (req, res) => {
  try {
    const vehicle = await vehicleModel.find({});
    res.status(200).send(vehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/vehicle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundedVehicle = await vehicleModel.findById(id);
    res.status(200).send(foundedVehicle);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
