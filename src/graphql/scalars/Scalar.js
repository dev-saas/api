const { GraphQLScalarType } = require('graphql')

module.exports = {
  Scalar: ({ name, description, parseValue, serialize, parseLiteral }) =>
    new GraphQLScalarType({
      name,
      description: description || `${name} type`,
      serialize: serialize || (value => value),
      parseValue,
      parseLiteral: parseLiteral || (ast => parseValue(ast.value))
    })
}
