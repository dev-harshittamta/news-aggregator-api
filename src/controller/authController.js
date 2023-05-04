const bcrypt = require('bcrypt')
const User = require('../models/user')
const dbHandler = require('../db/dbFunction')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
  dbHandler
    .findUser(req.body.email)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'User not found',
        })
      } else {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        )
        if (!passwordIsValid) {
          res.status(401).send({
            accessToken: null,
            message: 'Invalid password',
          })
        } else {
          let token = jwt.sign(
            {
              id: user.email,
            },
            process.env.API_SECRET,
            {
              expiresIn: 86400,
            }
          )
          res.status(200).send({
            user: {
              email: user.email,
              fullName: user.fullName,
            },
            message: 'Login successful',
            accessToken: token,
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Internal Server Error')
    })
}

const registerUser = async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    preferences: req.body.preferences ? req.body.preferences : {},
  })

  return await dbHandler.pushUser(user, res)
}

module.exports = {
  loginUser,
  registerUser,
}
