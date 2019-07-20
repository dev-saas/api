const {
  pagination,
  Dataloader,
  secureUpdate
} = require('../graphql/mongodb-utils')

const {
  NEW_EVENT,
  UPDATED_EVENT
} = require('../graphql/subscriptions/channels')

const EventService = (db, pubsub) => {
  const collection = db.connection.collection('events')
  const pages = pagination(collection)
  const { Event } = db.models

  const loadMany = (ids, info) => {
    Dataloader(Event)
      .Loader(info)
      .loadMany(ids)
  }

  const load = (id, info) =>
    Dataloader(Event)
      .Loader(info)
      .load(id.toString())

  const update = async (user, event, info) => {
    const updatedEvent = await secureUpdate(Event, user, event, info)
    pubsub.publish(UPDATED_EVENT, { updatedEvent })
    return updatedEvent
  }

  const create = async (user, event) => {
    const { title, description, price, date } = event
    try {
      const createdEvent = await Event.create({
        title: title,
        description: description,
        price: +price,
        date: date,
        creator: user.id
      })
      pubsub.publish(NEW_EVENT, { newEvent: createdEvent })
      return createdEvent
    } catch (err) {
      throw err
    }
  }

  return { update, create, load, loadMany, pages }
}

module.exports = EventService
