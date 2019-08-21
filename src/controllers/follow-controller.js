module.exports = ({ Follow, User }) => {
  return {
    followers: async (uid, page) => Follow.getPage(page, { following: uid }, 'owner'),

    following: async (uid, page) => Follow.getPage(page, { owner: uid }, 'following'),

    unfollow: (owner, following) => Follow.findOneAndRemove({ owner, following }),

    isFollower: async (owner, following) => {
      const isFollowing = await Follow.findOne({
        owner,
        following,
        status: 'ACCEPTED'
      })
      return !!isFollowing
    },

    follow: async (owner, following) => {
      const isPrivate = await User.isPrivate({ uid: following })
      return Follow.create({
        owner,
        following,
        status: isPrivate ? 'PENDING' : 'ACCEPTED'
      })
    }
  }
}
