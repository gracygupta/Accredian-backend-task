// routes/courses.js
const express = require("express");
const router = express.Router();
const { get_courses, add_course } = require("../controllers/courseController");
const { auth } = require("../middleware/auth_middleware");

// GET all courses
router.get("/", get_courses);

// POST a new course
router.post("/", auth, add_course);

module.exports = router;
