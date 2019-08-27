const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')
const auth = require('./middleware/auth')
const debug = require('debug')
const services = require('./services')
const controllers = require('./controllers')(services)

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
      ? {
        controllers,
        user: await auth(connection.context.headers.token)
      }
      : {
        // query, mutation context
        user: await auth(req.headers.token),
        controllers,
        recaptchaData: { // for @recaptcha directive
          ip: req.ip,
          key: req.headers.recaptcha
        }
      }
})
