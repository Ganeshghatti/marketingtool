const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const axios = require("axios");
const moment = require("moment");
const FormData = require("form-data");
const { sendErrorEmail } = require("../utils/Errormail");

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
