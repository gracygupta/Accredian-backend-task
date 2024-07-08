const jwt = require("jsonwebtoken");
const Res = require("../service/general.helper");
const http = require("../config/http.config");
const userService = require("../service/userService");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for authentication
async function auth(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return Res(res, http.forbidden_code, "Authentication failed");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.findUserById(decoded.userId);

    if (!user) {
      return Res(res, http.not_found_code, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error at auth.middleware authenticateToken ${error}`);
    return Res(res, http.forbidden_code, "Authentication failed");
  }
}

module.exports = { auth };
