const bcrypt = require('bcrypt');
require('dotenv').config()

const changePasword = (req, res, next) => {
  const {password} = req.body;
  const hash = bcrypt.hashSync(password, process.env.SALT);
  req.body.password = hash;

  next();
};

module.exports.changePasword = changePasword;