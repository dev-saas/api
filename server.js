process.env.NEW_RELIC_LICENSE_KEY && require('newrelic')

const debug = require('debug')('server:info')
const { createServer } = require('http')
const apolloServer = require('./src/apollo-server')
const app = require('./src/app')

const PORT = process.env.PORT || 8000

apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => debug(`listening on port ${PORT}`))
