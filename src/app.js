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
    'Content-Type, Authorization, Recaptcha'
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
    const { exception } = err.extensions
    debug('graphql:error')(exception.stacktrace)
    return process.env.NODE_ENV === 'production'
      ? {
          message: 'Sorry, try again later...'
        }
      : {
          message: err.message,
          path: err.path
        }
  },
  context: ({ req, connection }) =>
    connection
      ? { pubsub, services }
      : {
          user: auth(req.headers.authorization),
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
