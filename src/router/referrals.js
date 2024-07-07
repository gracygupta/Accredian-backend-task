// routes/referrals.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// POST a new referral
router.post("/", async (req, res) => {
  const { name, email, phoneNumber, referredBy, referredCourseId } = req.body;

  try {
    const newReferral = await prisma.referral.create({
      data: {
        name,
        email,
        phoneNumber,
        referredBy,
        referredCourseId,
      },
    });
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(500).json({ error: "Failed to create referral" });
  }
});

module.exports = router;
