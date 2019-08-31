const express = require('express')
const apolloServer = require('./apollo-server')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, Recaptcha')

  if (req.method === 'OPTIONS') return res.sendStatus(200)

  next()
})

apolloServer.applyMiddleware({ app })

module.exports = app
