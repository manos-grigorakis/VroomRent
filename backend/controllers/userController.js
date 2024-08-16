const userModel = require("../models/user");
const bookingModel = require("../models/booking");
const multer = require("multer");
const path = require("path");

exports.userById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-password -resetToken");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const filter = { _id: id };
    const update = { firstName: firstName, lastName: lastName, email: email };

    const updateUser = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    res.status(200).send({ message: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error: ", error: error.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      // Generates a unique filename for the avatar to prevent conflicts
      // in case two users uplaod an avatar with the same name
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage }).single("file");

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({ error: err.message });
    }

    const fileName = req.file.filename;
    console.log("Filename:", fileName);

    try {
      const { id } = req.body;
      console.log("User id: ", id);

      const user = await userModel.findByIdAndUpdate(
        id,
        { avatar: fileName },
        { new: true }
      );

      console.log("Image uploaded successfully");
      console.log(`Updated user id: ${user._id}, avatar: ${user.avatar}`);

      res.json({ avatar: user.avatar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating user avatar" });
    }
  });
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

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
