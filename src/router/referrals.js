// routes/referrals.js
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth_middleware");
const {
  give_referral,
  get_all_referrals,
  get_referral,
  delete_referral,
} = require("../controllers/referralController");

// POST a new referral
router.post("/", auth, give_referral);

// GET all referrals
router.get("/", auth, get_all_referrals);

// GET referral by id
router.get("/:id", auth, get_referral);

// DELETE referral by id
router.delete("/:id", auth, delete_referral);

module.exports = router;
