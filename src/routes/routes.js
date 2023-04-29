const express = require('express')
const { loginUser, registerUser } = require('../controller/authController')
const verifyToken = require('../middleWare/authJWT')
const {
  getNews,
  getPreferences,
  updatePreferences,
} = require('../controller/info')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router
  .route('/preferences')
  .get(verifyToken, getPreferences)
  .put(verifyToken, updatePreferences)
router.route('/news').get(verifyToken, getNews)

module.exports = router
