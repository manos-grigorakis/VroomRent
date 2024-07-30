require("dotenv").config();
const mongoose = require("mongoose");

const bookingModel = require("../models/booking");

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    updateUserId();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

async function updateUserId() {
  const bookingId = "66a0f223d5f4d68cce04bca8"; // Add the desired booking id
  const newUserId = "669fe1c1be6ecc02d248a8e7"; // add the user id you want to attach on the booking

  try {
    const result = await bookingModel.updateOne(
      { _id: new mongoose.Types.ObjectId(bookingId) },
      { $set: { userId: new mongoose.Types.ObjectId(newUserId) } }
    );

    if (result.modifiedCount > 0) {
      console.log("User ID updated successfully");
    } else {
      console.log("No document found with the specified booking ID");
    }
  } catch (error) {
    console.error("Error updating user ID:", error);
  } finally {
    mongoose.disconnect();
  }
}
