const { makeExecutableSchema } = require('graphql-tools');
const glue = require('schemaglue');

const { schema, resolver } = glue('src/graphql');

const directiveResolvers = require('./graphql/directives');

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
  directiveResolvers: directiveResolvers
});
