/* eslint-disable indent */
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')

const graphQLSchema = require('./schema')
const auth = require('./middleware/auth')
const debug = require('debug')
const pubsub = require('./pubsub')
const mqtt = require('./mqtt')
const app = express()
const db = require('./database')
const Services = require('./services')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, token, Recaptcha'
  )
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

const services = Services(db, pubsub, mqtt)

const server = new ApolloServer({
  schema: graphQLSchema,
  formatError(err) {
    if (process.env.NODE_ENV !== 'production') {
      const { exception } = err.extensions
      debug('graphql:error')(exception.stacktrace)
    }
    return {
      message: err.message,
      path: err.path
    }
  },
  context: async ({ req, connection }) =>
    connection
      ? { pubsub, services }
      : {
          user: await auth(req.headers.token),
          mqtt,
          services,
          recaptchaData: {
            ip: req.ip,
            key: req.headers.recaptcha
          }
        }
})

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

module.exports = httpServer
