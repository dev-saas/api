module.exports = db => {
  const { Booking, Event } = db.models

  const getPage = (page, info, params) => Booking.getPage(page, info, params)
  const loadMany = (ids, info) => Booking.loadMany(ids, info)
  const load = (id, info) => Booking.load(id, info)

  const bookEvent = async (owner, event) => {
    await Event.exists(event)
    return Booking.create({ owner, event })
  }

  const cancel = (userId, id) => Booking.secureRemove(userId, id)

  return { bookEvent, cancel, getPage, loadMany, load }
}
