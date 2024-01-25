const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");
const path = require("path");

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
  const gifPath = path.join(__dirname, "..", "music.gif");

  const mailOptions = {
    from: "ganeshghatti6@gmail.com", // Replace with your Gmail address
    subject: emailSubject || "Default Subject", // Use provided subject or default to 'Default Subject'
    html: `
    <p>${emailBody || "Default Body"}</p>
      <p>Thank you for choosing our service! Here are our plans:</p>
      <img src="cid:unique-gif-id" alt="GIF">
      <p>Please contact us on our official email: info@company.com</p>
    `,
    to: chips.join(","), // Join the array of emails into a comma-separated string
    attachments: [
      {
        filename: "gif.gif",
        path: gifPath,
        cid: "unique-gif-id", // Use a unique identifier for the GIF
      },
    ],
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
