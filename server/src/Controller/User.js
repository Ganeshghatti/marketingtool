const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

exports.sendemail = async (req, res, next) => {
  const { chips, emailSubject, emailBody } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ghattiganesh8@gmail.com",
      pass: "gecy jkfr fzmy dcwf",
    },
  });

  const mailOptions = {
    from: "ghattiganesh8@gmail.com",
    subject: emailSubject || "Default Subject",
    text: emailBody || "Default Body",
    to: chips.join(","),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.json({ message: "Chips submitted and emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
};
