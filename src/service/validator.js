const { validationResult } = require("express-validator");
const Res = require("../service/general.helper");
const Http = require("../config/http.config");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = Object.values(errors.errors).map((val) => {
      return val.msg;
    });

    return Res(res, Http.forbidden_code, messages);
  } else {
    next();
  }
};

module.exports = { validateRequest };
