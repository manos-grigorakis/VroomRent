require("dotenv").config();

const mongoose = require("mongoose");

const bookingExtrasModel = require("../models/bookingExtras");

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    addVehicle();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

const addBookingExtras = async () => {
  const bookingExtras = await bookingExtrasModel.insertMany([
    {
      icon: "tow-truck.svg",
      title: "Roadside Assistance",
      description:
        "Drive confidently knowing you're covered with our 24/7 roadside assistance service for any unexpected events.",
      price: 7,
    },
    {
      icon: "tolls.svg",
      title: "Toll Pass",
      description:
        "Skip the toll booth line with our pre-paid toll pass, saving you time on the road.",
      price: 10,
    },
    {
      icon: "tolls.svg",
      title: "Toll Pass",
      description:
        "Skip the toll booth line with our pre-paid toll pass, saving you time on the road.",
      price: 10,
    },
    {
      icon: "child-safety-seat.svg",
      title: "Child Safety Seats",
      description:
        "Keep your little ones safe and secure with our range of child seats, suitable for all ages and sizes.",
      price: 7,
    },
    {
      icon: "pump-fuel.svg",
      title: "Prepaid Fuel",
      description:
        "Hit the road faster with prepaid fule. Return the car at any level, and avoid refueling charges.",
      price: 70,
    },
    {
      icon: "location.svg",
      title: "GPS Navigation System",
      description:
        "Never get lost with our state-of-the-art GPS navigation system, guiding you to your destination with ease.",
      price: 5,
    },
  ]);
  console.log("Retrieved Values", bookingExtras);
};

addBookingExtras();
