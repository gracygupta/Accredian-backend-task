const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateRequest } = require("../service/validator");

const { login, signup } = require("../controllers/authControllers");

// Create User API
router.post(
  "/signup",
  [
    body("email", "Email Required").exists(),
    body("password", "Password Required").exists(),
  ],
  validateRequest,
  signup
);

// Login User API
router.post(
  "/login",
  [
    body("email", "Email Required").exists(),
    body("password", "Password Required").exists(),
  ],
  validateRequest,
  login
);

module.exports = router;
