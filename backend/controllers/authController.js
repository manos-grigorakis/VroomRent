const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const transporter = require("../config/nodemailer");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    // Hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creating a new userModel
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Saving user to db
    await newUser.save();

    res
      .status(201)
      .send({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "User registration failed.", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Wrong password for user:", email);
      return res.status(400).send({ message: "Wrong Password" });
    }

    res.status(200).send({ message: "You are now logged in", user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login Failed", error });
  }
};

exports.registrationEmail = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "🎉  Welcome to VroomRent!",
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
        <img src="https://i.imgur.com/ZTiZ59o.jpg" alt="VroomRent Logo" />
        <p>
          Thank you for signing up with VroomRent! We are excited to have you
          with us.
        </p>
      </div>
      <div class="body">
        <h1>Hello ${firstName} ${lastName}</h1>
        <h2>Account Details:</h2>
        <p><strong>First name:</strong> ${firstName}</p>
        <p><strong>Last name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <h3>How to Get Starded:</h3>
        <ol>
          <li>
            <strong>Log In: </strong>You can log in to your account using the
            email and password you chose during registration.
          </li>
          <li>
            <strong>Explore: </strong>Browse our platform and discover the
            services we offer.
          </li>
          <li>
            <strong>Make a Reservation: </strong>Choose the vehicle you want and
            make your first reservation with just a few clicks!
          </li>
        </ol>
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
