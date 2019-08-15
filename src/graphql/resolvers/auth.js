exports.resolver = {
  Mutation: {
    register: (_, { token }, { controllers }) =>
      controllers.auth.register(token)
  }
}
