const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dbHandler = require('../db/dbFunction')
const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.API_SECRET,
      (err, decoded) => {
        if (err) {
          req.user = undefined
          next()
        } else {
          dbHandler
            .findUser(decoded.id)
            .then((user) => {
              req.user = user
              next()
            })
            .catch((err) => {
              res.status(500).send({
                message: err,
              })
            })
        }
      }
    )
  } else {
    req.user = undefined
    req.message = 'Authorization header has not been set'
    next();
  }
}


module.exports = verifyToken;
