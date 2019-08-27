const path = require('path')
const { makeExecutableSchema } = require('apollo-server-express')
const { transpileSchema } = require('graphql-s2s').graphqls2s
const glue = require('schemaglue')
const { schema, resolver } = glue(path.join(__dirname, 'graphql'))
const directiveResolvers = require('./graphql/_directives')

module.exports = makeExecutableSchema({
  typeDefs: transpileSchema(schema),
  resolvers: resolver,
  directiveResolvers
})
