const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const glue = require('schemaglue')
var { schema, resolver } = glue(
  process.env.NODE_ENV === 'production'
    ? 'src/graphql'
    : path.join(__dirname, 'graphql')
)
const directiveResolvers = require('./graphql/directives')

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
  directiveResolvers: directiveResolvers
})
