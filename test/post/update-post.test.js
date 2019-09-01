const { mutationUpdatePost } = require('./queries')

describe('An registered user', () => {
  it('should edit its posts', () => {
    mutationUpdatePost.variables = {
      post: {
        _id: global.post,
        message: 'Testeee'
      }
    }

    return global.request()
      .set('token', global.token.user1)
      .send(mutationUpdatePost)
      .expect(200)
      .expect(res => {
        expect(res.body.data.updatePost._id).toBeDefined()
        expect(res.body.data.updatePost.message).toBe('Testeee')
      })
  })

  it('should not edit another user posts', () => {
    mutationUpdatePost.variables = {
      post: {
        _id: global.post,
        message: 'Testeee'
      }
    }

    return global.request()
      .set('token', global.token.user2)
      .send(mutationUpdatePost)
      .expect(200)
      .expect(res => {
        expect(res.body.errors).toBeDefined()
      })
  })
})
