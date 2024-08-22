const bookingExtrasModel = require("../models/bookingExtras");
const vehicleModel = require("../models/vehicle");
const bookingModel = require("../models/booking");
const offerModel = require("../models/offer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const transporter = require("../config/nodemailer");

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

exports.sendReceiptEmail = async (req, res) => {
  const { email, name, bookingData } = req.body;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "✔️ Booking Receipt",
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .container {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 20px;
      }
      .header {
        background-color: #ffffff;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #dddddd;
        border-radius: 20px;
      }
      .header img {
        max-width: 400px;
      }
      .body {
        background-color: #ffffff;
        padding: 20px;
        margin-top: 10px;
        border: 1px solid #dddddd;
        border-radius: 20px;
      }
      .body h1 {
        color: #333333;
      }
      .body p {
        color: #555555;
      }
      .footer {
        background-color: #ffffff;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #dddddd;
        margin-top: 10px;
        border-radius: 20px;
      }
      .footer p {
        color: #555555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://i.imgur.com/ZTiZ59o.jpg"
          alt="VroomRent Logo"
        />
        <p>Thank you for your booking on <strong>VroomRent</strong>.</p>
      </div>
      <div class="body">

        <h1>Hello ${name},</h1>
        <h2>Booking Overview: </h2>
        <p><strong>Vehicle:</strong> ${bookingData.vehicle}</p>
        <p><strong>Pickup Location:</strong> ${bookingData.pickUpLocation}</p>
        ${
          bookingData.dropoffLocation
            ? `<p><strong>Dropoff Location: </strong>${bookingData.dropoffLocation}</p>`
            : ""
        }
        <p><strong>Pickup Date:</strong> ${bookingData.pickupDate}</p>
        <p><strong>Dropoff Date:</strong> ${bookingData.dropoffDate}</p>
        ${
          bookingData.selectedExtras
            ? `<p><strong>Extras:</strong><br><ul>${bookingData.selectedExtras}</ul></p>`
            : ""
        }
        <p><strong>Total: $</strong> ${bookingData.total}</p>

        <hr>
        <h3>Customer Information: </h3>
        <p><strong>Address</strong>: ${bookingData.address}, ${
        bookingData.city
      }, ${bookingData.postalCode}, ${bookingData.country}</p>
        <p><strong>Phone: </strong> ${bookingData.phone}</p>
        <p><strong>Email: </strong> ${email}</p>

        <hr>
        <h3>Payment Details: </h3>
        <p><strong>Payment Method: </strong> Card</p>
      </div>
      <div class="footer">
        <p>
          Thank you for choosing VroomRent! We hope you enjoy your experience
          with us.
        </p>
        <p>
          If you have any questions, feel free to
          <a href="mailto:vroomrent.comp@gmail.com">contact us</a>.
        </p>

        <p>Best regards,</p>
        <p>The VroomRent Team</p>
      </div>
    </div>
  </body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await offerModel.find({});

    if (!offers) {
      return res.status(404).send({ message: "There are not offers" });
    }
    res.status(200).send(offers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Server error getting offers", error: error.message });
  }
};
