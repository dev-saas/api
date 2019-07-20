const { makeExecutableSchema } = require('graphql-tools')
const glue = require('schemaglue')
const directiveResolvers = require('./graphql/directives')
const { schema, resolver } = glue('src/graphql')

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
  directiveResolvers: directiveResolvers
})
