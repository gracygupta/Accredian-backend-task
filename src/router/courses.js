// routes/courses.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new course
router.post("/", async (req, res) => {
  const {
    name,
    enrolledReferrerBonus,
    enrolledRefereeBonus,
    refereeBonus,
    referrerBonus,
    price,
    category,
  } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        enrolledReferrerBonus,
        enrolledRefereeBonus,
        refereeBonus,
        referrerBonus,
        price,
        category,
      },
    });
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create course" });
  }
});

module.exports = router;
