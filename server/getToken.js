const jwt = require('jsonwebtoken')

const getToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '3h' })
}

module.exports = getToken
