const userModel = require("../models/user");
const bookingModel = require("../models/booking");

exports.userById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-password -resetToken");

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await bookingModel
      .find({ userId: id })
      .populate({
        path: "userId",
        select: "-password -resetToken",
      })
      .populate({
        path: "vehicleId",
      });
    if (!bookings) {
      return res
        .status(404)
        .send({ message: "No bookings found for this user." });
    }

    res.send(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await bookingModel
      .findById(id)
      .populate({
        path: "vehicleId",
        select: "name price",
      })
      .populate({
        path: "bookingExtras.selectedExtrasId",
        select: "title price",
      });

    if (!booking) {
      return res.status(404).send({ message: "Booking not founded!" });
    }
    res.send(booking);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error: ", error: error.message });
  }
};
