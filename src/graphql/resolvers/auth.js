exports.resolver = {
  Mutation: {
    register: (_, { token }, { services }) =>
      services.auth.register(token)
  }
}
