module.exports = {
  mutationNewPost: {
    query: `
      mutation ($post: NewPostInput!) {
        newPost(post: $post){
          _id
          message
        }
      }
    `
  },
  mutationUpdatePost: {
    query: `
      mutation ($post: UpdatePostInput!) {
        updatePost(post: $post){
          _id
          message
        }
      }
    `
  }
}
