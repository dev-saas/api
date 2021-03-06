const { mutationCommentPost } = require('./queries')

describe('An registered user', () => {
  it('should comment a post', () => {
    mutationCommentPost.variables = {
      comment: {
        post: global.post,
        message: 'Testeee'
      }
    }

    return global.request()
      .set('token', global.token.user2)
      .send(mutationCommentPost)
      .expect(200)
      .expect(res => {
        expect(res.body.data.commentPost._id).toBeDefined()
        expect(res.body.data.commentPost.message).toBe('Testeee')
        expect(res.body.data.commentPost.owner.username).toBe('test2')
        expect(res.body.data.commentPost.post.owner.username).toBe('test')
      })
  })
})
