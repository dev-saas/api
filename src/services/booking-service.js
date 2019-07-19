const { infoToProjection } = require('../graphql/mongodb-utils')

module.exports = {
  get: ({ user, models: { Booking } }, info) =>
    Booking.find({ user: user.id }, infoToProjection(info)),

  bookEvent: async (eventId, { user, models: { Booking, Event } }) => {
    const fetchedEvent = await Event.findOne({ _id: eventId }, { _id: 1 })
    return Booking.create({
      user: user.id,
      event: fetchedEvent
    })
  },
  cancel: async (bookingId, { user, models: { Booking, Event } }, info) => {
    try {
      const booking = await Booking.findOne({ _id: bookingId, user: user.id })
      await Booking.deleteOne({ _id: bookingId, user: user.id })
      return Event.findOne({ _id: booking.event }, infoToProjection(info))
    } catch (err) {
      throw err
    }
  }
}
