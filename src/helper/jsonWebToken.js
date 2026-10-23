const jwt = require("jsonwebtoken");
const createJSONWebToken = (payload = {}, privateKey, expiresIn) => {
  const token = jwt.sign(payload, privateKey, { expiresIn });
  return token;
};

module.exports = { createJSONWebToken };
