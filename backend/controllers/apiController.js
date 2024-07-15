const bookingExtrasModel = require("../models/bookingExtras");
const vehicleModel = require("../models/vehicle");
const bookingModel = require("../models/booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getBookingExtras = async (req, res) => {
  try {
    const bookingExtras = await bookingExtrasModel.find({});
    res.status(200).send(bookingExtras);
  } catch (error) {
    console.error(error);
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicle = await vehicleModel.find({});
    res.status(200).send(vehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedVehicle = await vehicleModel.findById(id);
    res.status(200).send(foundedVehicle);
  } catch (error) {
    console.error(error);
  }
};

exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = new bookingModel(bookingData);
    await newBooking.save();

    res
      .status(201)
      .send({ message: "Booking created successfully!", booking: newBooking });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createPaymentIntent = async (req, res) => {
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
      // sends back the paymentId so it can be cancelled if user closes the window or refresh
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

exports.cancelPaymentIntent = async (req, res) => {
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
};
