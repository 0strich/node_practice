const bcrypt = require('bcrypt');
require('dotenv').config()

const changePassword = (req, res, next) => {
  const {password} = req.body;
  if (password) {
    const hash = bcrypt.hashSync(password, process.env.SALT);
    req.body.password = hash;
  }
  next();
};

module.exports.changePassword = changePassword;