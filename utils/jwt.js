const jwt = require('jsonwebtoken')
require('dotenv').config()

const testDB = {
  usename: 'test',
  email: 'gee8195@naver.com',
  password: '1234'
}

const tryLogin = (req, res, next) => {
  const token = req.headers['x-access-token']

  // 토큰이 있다면 verify 검증
  if (token) {
    // 토큰 인증 시간이 만료되었는지 확인 

    // 맞다면 refresh token 확인 후, 재발급
    res.status(401).send({ tokenExist: true })
    // 아니라면 db 검증 후 반환
  } else {
    // db 검증
    if (Object.keys(testDB).includes(req.body.username)) {
      const token = jwt.sign({
        username: req.body.username,
        email: req.body.email
      }, process.env.JWT_SECRET)
      req.body.token = token
    }

    // 있다면 토큰 반환

    // 아니라면 403 status, 계정 없음 반환
  }
}

module.exports.tryLogin = tryLogin 