const express = require("express");
const router = express.Router();

router.use("/courses", require("./courses"));

router.use("/referrals", require("./referrals"));

router.use("/auth", require("./auth"));

module.exports = router;
