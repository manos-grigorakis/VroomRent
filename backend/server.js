require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));

// Connection with database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

// Routes
app.use("/stripe_webhooks", require("./routes/webhook"));
// Middleware for all the other routes. !Dont put it above stripe_webhooks
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
