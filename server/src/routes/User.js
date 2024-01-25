const express = require("express");
const router = express.Router();
const { sendemail } = require("../Controller/User");

router.route("/api/submit").post(sendemail);

module.exports = router;
