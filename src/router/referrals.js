// routes/referrals.js
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth_middleware");
const { give_referral } = require("../controllers/referralController");

// POST a new referral
router.post("/", auth, give_referral);

module.exports = router;
