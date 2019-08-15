exports.resolver = {
  Booking: {
    event: ({ event }, _, { controllers }, info) =>
      controllers.event.load(event, info),

    owner: ({ owner }, _, { controllers }, info) =>
      controllers.user.load(owner, info)
  },
  BookingsConnection: {
    edges: ({ edges }, _, { controllers }, info) =>
      controllers.booking.loadMany(edges, info)
  },
  Query: {
    getBookings: (_, { page }, { user, controllers }, info) =>
      controllers.booking.getPage(page, info, { owner: user.id })
  },
  Mutation: {
    bookEvent: async (_, { eventId }, { user, controllers }) =>
      controllers.booking.bookEvent(user.id, eventId),

    cancelBooking: async (_, { bookingId }, { user, controllers }) =>
      controllers.booking.cancel(user.id, bookingId)
  }
}
