const path = require('path')
const { makeExecutableSchema } = require('apollo-server-express')
const glue = require('schemaglue')
const { schema, resolver } = glue(path.join(__dirname, 'graphql'))
const directiveResolvers = require('./graphql/directives')

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
  directiveResolvers
})
