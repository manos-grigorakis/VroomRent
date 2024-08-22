require("dotenv").config();

const mongoose = require("mongoose");
const offerModel = require("../models/offer");

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error.message);
  });

const addOffer = async () => {
  const offer = await offerModel.create({
    img: "averie-woodard-5d20kdvFCfA-unsplash.webp",
    title: "Early Bird Discount",
    description:
      "Plan ahead and save! Book your car rental at least a month in advance and enjoy 15% off.",
    details: [
      "Valid for any rental duration.",
      "Minimum 7-day rental required.",
      "Applicable to any booking made 30 days before.",
    ],
    ctaText: "Reserve Now",
    discountCode: "EARLYBIRD15",
    discountValue: 15,
    conditions: [
      { type: "minDaysBeforeBooking", value: 30 },
      { type: "minRentalDays", value: 7 },
    ],
  });
  console.log("Retrieved Values", offer);
};

addOffer();
