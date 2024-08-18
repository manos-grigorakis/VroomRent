require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static("public"));

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error.message);
  });

// Routes
app.use("/stripe_webhooks", require("./routes/webhook"));
// Middleware for all the other routes. !Dont put it above stripe_webhooks
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

// Makes /uploads available through 'http://localhost:3000/uploads' so it can be used in frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", require("./routes/user"));

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(port, () => {
  console.log(`Server listening on: ${PORT}`);
});
