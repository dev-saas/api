const express = require('express')
const apolloServer = require('./apollo-server')
const cors = require('./middleware/cors')
const app = express()

app.use(cors)

apolloServer.applyMiddleware({ app })

module.exports = app
