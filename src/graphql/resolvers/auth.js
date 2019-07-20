exports.resolver = {
  Mutation: {
    createUser: async (_, { email, password }, { services }) =>
      services.auth.register(email, password)
  },
  Query: {
    login: (_, { email, password }, { services }) =>
      services.auth.login(email, password)
  }
}
