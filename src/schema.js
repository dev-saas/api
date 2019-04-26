const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const glue = require('schemaglue');
if (process.env.NODE_ENV === 'production') {
  var { schema, resolver } = glue('src/graphql');
} else {
  var { schema, resolver } = glue(path.join(__dirname, 'graphql'));
}
const directiveResolvers = require('./graphql/directives');

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
  directiveResolvers: directiveResolvers
});
