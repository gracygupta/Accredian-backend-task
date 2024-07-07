const jwt = require("jsonwebtoken");
const Res = require("../service/general.helper");
const http = require("../config/http.config");
const userService = require("../service/userService");

// Middleware for authentication
async function authtoken(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return Res(res, http.forbidden_code, "Authentication failed");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userService.findUserById(decoded.user.id);

    if (!user) {
      return Res(res, http.not_found_code, "User not found");
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    console.error(`Error at auth.middleware authenticateToken ${error}`);
    return Res(res, http.forbidden_code, "Authentication failed");
  }
}

module.exports = authtoken;
