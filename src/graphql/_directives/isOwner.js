const { NOT_OWNER } = require('../error')
const { isAuth } = require('./isAuth')

module.exports = {
  async isOwner (next, owner, requires, { user, controllers }) {
    // check if is authenticated
    isAuth(next, null, null, { user })

    // get context user id
    let { _id } = await controllers.user.findByUID(user, null, { _id: 1 })

    // check if context user is owner
    if (owner._id.equals(_id)) return next()

    throw new Error(NOT_OWNER)
  }
}
