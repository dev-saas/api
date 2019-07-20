const {
  infoToProjection,
  pagination
} = require('../graphql/mongodb-utils')

const BookingService = db => {
  const collection = db.connection.collection('bookings')
  const pages = pagination(collection)
  const { Booking, Event } = db.models

  const bookEvent = async (user, eventId) => {
    const fetchedEvent = await Event.findOne(
      { _id: eventId },
      { _id: 1 }
    )
    return Booking.create({
      user: user.id,
      event: fetchedEvent
    })
  }

  const cancel = async (user, bookingId, info) => {
    try {
      const booking = await Booking.findOne({
        _id: bookingId,
        user: user.id
      })
      await Booking.deleteOne({ _id: bookingId, user: user.id })
      return Event.findOne(
        { _id: booking.event },
        infoToProjection(info)
      )
    } catch (err) {
      throw err
    }
  }

  return { bookEvent, cancel, pages }
}

module.exports = BookingService
