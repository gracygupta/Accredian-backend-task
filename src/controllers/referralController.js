const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const give_referral = async (req, res) => {
  const { name, email, phoneNumber, referredCourseId } = req.body;

  try {
    const newReferral = await prisma.referral.create({
      data: {
        name,
        email,
        phoneNumber,
        referredBy: req.user.id,
        referredCourseId,
      },
    });
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(500).json({ error: "Failed to create referral" });
  }
};

module.exports = { give_referral };
