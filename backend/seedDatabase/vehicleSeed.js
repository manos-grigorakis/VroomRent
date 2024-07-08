require("dotenv").config();

const mongoose = require("mongoose");

const vehicleModel = require("../models/vehicle");

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

const addVehicle = async () => {
  const vehicle = await vehicleModel.create({
    name: "BMW 5 Series",
    image: "2023-bmw-540i-main-removebg-preview.png",
    category: ["Luxurious", "Large"],
    price: 180,
    details: {
      passengers: 5,
      transmission: "Automatic",
      fuel: "Diesel",
      storage: {
        bigCase: 2,
        smallCase: 2,
      },
    },
  });
  console.log("Retrieved Values", vehicle);
};

addVehicle();
