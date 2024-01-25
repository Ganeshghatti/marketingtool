const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "api", ".env") });
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

module.exports = app;
