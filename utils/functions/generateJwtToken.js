const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwtToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const options = {expiresIn: 60 * 60 * 24 * 90};
  const jwtToken = jwt.sign(payload, jwtSecret, options);

  return jwtToken;
}

module.exports = generateJwtToken;