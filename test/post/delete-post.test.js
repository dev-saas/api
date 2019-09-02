const { mutationDeletePost } = require('./queries')

describe('An registered user', () => {
  it('should delete its posts', () => {
    mutationDeletePost.variables = {
      id: global.post
    }

    return global.request()
      .set('token', global.token.user1)
      .send(mutationDeletePost)
      .expect(200)
      .expect(res => {
        expect(res.body.data.deletePost._id).toBeDefined()
        expect(res.body.data.deletePost.message).toBe('Test post')
      })
  })
})
