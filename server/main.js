const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");

dotenv.config({ path: path.join(__dirname, "api", ".env") });
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

app.post("/api/submit", async (req, res) => {
  const { chips, emailSubject, emailBody } = req.body;
  console.log(chips, emailSubject, emailBody);
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
});
app.get("/", (req, res) => {
  res.send("siuhfnwuehfwC");
});

module.exports = app;
