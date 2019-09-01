const { mutationNewPost } = require('./queries')

describe('An registered user', () => {
  it('should post a new twit', () => {
    mutationNewPost.variables = {
      post: {
        message: 'Teste'
      }
    }

    return global.request()
      .set('token', global.token.user1)
      .send(mutationNewPost)
      .expect(200)
      .expect(res => {
        expect(res.body.data.newPost._id).toBeDefined()
        expect(res.body.data.newPost.message).toBe('Teste')
      })
  })

  it('should not post an empty twit', () => {
    mutationNewPost.variables = {
      post: {
        message: ''
      }
    }

    return global.request()
      .set('token', global.token.user1)
      .send(mutationNewPost)
      .expect(200)
      .expect(res => {
        expect(res.body.errors).toBeDefined()
      })
  })

  it('should not post twit with more than 256 characters', () => {
    mutationNewPost.variables = {
      post: {
        message: 'asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd'
      }
    }

    return global.request()
      .set('token', global.token.user1)
      .send(mutationNewPost)
      .expect(400)
  })
})
