const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const router = require('./routes/routes')

const PORT = process.env.PORT || 4200

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/v1/', router)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
