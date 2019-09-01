const { mutationNewPost, queryPost, queryPosts } = require('./queries')

describe('An registered user', () => {
  it('should see a post', () => {
    queryPost.variables = {
      id: global.post
    }

    return global.request()
      .send(queryPost)
      .expect(200)
      .expect(res => {
        expect(res.body.data.post._id).toBeDefined()
        expect(res.body.data.post.message).toBe('Test post')
      })
  })

  it('should see a page of posts', () => {
    return global.request()
      .send(queryPosts)
      .expect(200)
      .expect(res => {
        expect(res.body.data.posts.cursor).toBeDefined()
        expect(res.body.data.posts.hasNextPage).toBe(false)
        expect(res.body.data.posts.nodes.length).toBe(2)
      })
  })

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
