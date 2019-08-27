const { NEW_COMMENT, UPDATED_COMMENT } = require('../graphql/channels')

module.exports = ({ mongo: { Comment, Post }, pubsub }) => {
  return {
    newSubscription: () => pubsub.asyncIterator(NEW_COMMENT),

    updateSubscription: () => pubsub.asyncIterator(UPDATED_COMMENT),

    create: async (owner, comment) => {
      await Post.exists(comment.post)
      const newComment = await Comment.create({ owner, ...comment })
      pubsub.publish(NEW_COMMENT, { newComment })
      return newComment
    },

    remove: (userId, id) => Comment.secureRemove(userId, id)
  }
}
