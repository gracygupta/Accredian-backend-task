const express = require("express");
const router = express.Router();

router.use("/course", require("./courses"));

router.use("/referral", require("./referrals"));

router.use("/user", require("./user"));

module.exports = router;
