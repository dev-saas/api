exports.resolver = {
  Mutation: {
    createUser: async (_, { email, password }, { services }) =>
      services.auth.regiser(email, password)
  },
  Query: {
    login: (_, { email, password }, { services }) =>
      services.auth.login(email, password)
  }
}
