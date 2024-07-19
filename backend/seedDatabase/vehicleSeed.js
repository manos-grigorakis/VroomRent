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
  const vehicle = await vehicleModel.create(
    {
      name: "Volkswagen Polo",
      image: "volkswagen-polo-gti.png",
      category: ["Small", "City"],
      price: 70,
      details: {
        passengers: 5,
        transmission: "Manual",
        fuel: "Petrol",
        storage: {
          bigCase: 1,
          smallCase: 2,
        },
      },
    },
    {
      name: "Fiat 500",
      image: "fiat-500.png",
      category: ["Small", "City"],
      price: 40,
      details: {
        passengers: 4,
        transmission: "Manual",
        fuel: "Petrol",
        storage: {
          bigCase: 0,
          smallCase: 2,
        },
      },
    },
    {
      name: "Tesla Model 3",
      image: "tesla-model-3.png",
      category: ["Large"],
      price: 200,
      details: {
        passengers: 5,
        transmission: "Automatic",
        fuel: "Electric",
        storage: {
          bigCase: 2,
          smallCase: 2,
        },
      },
    },
    {
      name: "BMW M2",
      image: "bmw-m2.png",
      category: ["Luxurious"],
      price: 700,
      details: {
        passengers: 4,
        transmission: "Automatic",
        fuel: "Petrol",
        storage: {
          bigCase: 1,
          smallCase: 2,
        },
      },
      premiumDelivery: true,
    },
    {
      name: "Ford Puma",
      image: "ford-puma.png",
      category: ["Medium", "SUV"],
      price: 90,
      details: {
        passengers: 5,
        transmission: "Automatic",
        fuel: "Petrol",
        storage: {
          bigCase: 2,
          smallCase: 2,
        },
      },
    },
    {
      name: "Mercedes A Class",
      image: "mercedes-benz-a-class.png",
      category: ["Medium"],
      price: 100,
      details: {
        passengers: 5,
        transmission: "Automatic",
        fuel: "Petrol",
        storage: {
          bigCase: 2,
          smallCase: 1,
        },
      },
    }
  );
  console.log("Retrieved Values", vehicle);
};

addVehicle();
