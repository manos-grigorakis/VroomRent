require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const userModel = require("./models/user");
const vehicleModel = require("./models/vehicle");
const bookingExtrasModel = require("./models/bookingExtras");

const app = express();
const port = 3000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:`, err.message);
      return response.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent was successful: ${paymentIntent.id}`);
        // Update your database to mark the payment as successful
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        console.log(`PaymentIntent failed: ${paymentIntentFailed.id}`);
        // Update your database to mark the payment as failed
        break;
      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object;
        console.log(`PaymentIntent was canceled: ${paymentIntentCanceled.id}`);
        // Update your database to mark the payment as canceled
        break;
      case "customer.created":
        const customer = event.data.object;
        console.log(`Customer was created: ${customer.id}`);
        // Update your database to mark the customer as created
        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object;
        console.log(`PaymentIntent was created: ${paymentIntentCreated.id}`);
        // Update your database to mark the payment intent as created
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

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

// Retrieves all extras from db
app.get("/bookingExtras", async (req, res) => {
  try {
    const bookingExtras = await bookingExtrasModel.find({});
    res.status(200).send(bookingExtras);
  } catch (error) {
    console.error(error);
  }
});

// Retrieves all vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const vehicle = await vehicleModel.find({});
    res.status(200).send(vehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Retrieves vehicle by id
app.get("/vehicle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundedVehicle = await vehicleModel.findById(id);
    res.status(200).send(foundedVehicle);
  } catch (error) {
    console.error(error);
  }
});

// Stripe payment

// Create a payment
app.post("/create-payment-intent", async (req, res) => {
  const { name, email, phone, line1, country, city, postal_code, amount } =
    req.body;

  try {
    // Create a customer
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      phone: phone,
      address: {
        line1: line1,
        country: country,
        city: city,
        postal_code: postal_code,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: "usd",
      customer: customer.id,
      metadata: {
        customer_email: email,
        customer_name: name,
        customer_phone: phone,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      // paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.post("/cancel-payment-intent", async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(
      paymentIntentId
    );
    res.send({ canceledPaymentIntent });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
