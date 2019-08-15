const { GraphQLScalarType } = require('graphql')

const Scalar = ({ name, description, parseValue, serialize, parseLiteral }) =>
  new GraphQLScalarType({
    name,
    description: description || `${name} type`,
    serialize: serialize || parseValue,
    parseValue,
    parseLiteral: parseLiteral || (ast => parseValue(ast.value))
  })

module.exports = { Scalar }
