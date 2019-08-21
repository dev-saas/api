const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./middleware/cors')

const app = express()

app.use(bodyParser.json())
app.use(cors)

module.exports = app
