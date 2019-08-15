/* eslint-disable indent */
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')
const schema = require('./schema')
const auth = require('./middleware/auth')
const cors = require('./middleware/cors')
const debug = require('debug')
const pubsub = require('./pubsub')
const mqtt = require('./mqtt')
const app = express()
const db = require('./database')
const Controllers = require('./controllers')

app.use(bodyParser.json())
app.use(cors)

const controllers = Controllers(db, pubsub, mqtt)

const server = new ApolloServer({
  schema,
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
    connection // subscription context
      ? { pubsub, controllers }
      : {
          // query, mutation context
          user: await auth(req.headers.token),
          mqtt,
          controllers,
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
