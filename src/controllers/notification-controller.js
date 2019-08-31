const { NEW_NOTIFICATION } = require('../graphql/channels')

module.exports = ({ models: { Notification }, pubsub }) => {
  return {
    findByUserUID: (uid, page) => Notification.getPage(page, { owner: uid }),

    newNotification: async (owner, sender, message) => {
      let newNotification = await Notification.create({
        owner,
        sender,
        message
      })
      pubsub.publish(NEW_NOTIFICATION, newNotification)
      return true
    },

    newSubscription: () => pubsub.asyncIterator(NEW_NOTIFICATION)
  }
}
