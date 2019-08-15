exports.resolver = {
  Query: {
    myEvents: (_, { page }, { user, controllers }, info) =>
      controllers.event.getPage(page, info, {
        owner: user.id
      }),

    me: (_, params, { user, controllers }, info) =>
      controllers.user.load(user.id, info)
  }
}
