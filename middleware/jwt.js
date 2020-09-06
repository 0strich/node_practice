const jwt = require('jsonwebtoken')

const isLoggedin = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    res.status(401).send({ tokenExist: false })
  } else {
    res.status(200).send({ tokenExist: true })
  }
}

module.exports.isLoggedin = isLoggedin