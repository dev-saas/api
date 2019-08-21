/* eslint-disable indent */
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')
const auth = require('./middleware/auth')
const debug = require('debug')
const pubsub = require('./pubsub')
const mqtt = require('./mqtt')
const db = require('./database')

const controllers = require('./controllers')(db, pubsub, mqtt)

module.exports = new ApolloServer({
  schema,
  formatError (err) {
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
      ? { controllers, user: await auth(connection.context.headers.token) }
      : {
          // query, mutation context
          user: await auth(req.headers.token),
          controllers,
          recaptchaData: {
            ip: req.ip,
            key: req.headers.recaptcha
          }
        }
})
