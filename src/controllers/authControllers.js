const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const Res = require("../service/general.helper");
const http = require("../config/http.config");

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Res(res, http.bad_request, "User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    return Res(res, http.created_code, "User Created", {
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Res(res, http.not_found_error, "Invalid Credentials");
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return Res(res, http.unauthorized_code, "Invalid Credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error("Error creating user:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

module.exports = { login, signup };
