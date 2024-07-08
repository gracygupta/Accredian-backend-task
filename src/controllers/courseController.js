const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const get_courses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const add_course = async (req, res) => {
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
};

module.exports = { get_courses, add_course };
