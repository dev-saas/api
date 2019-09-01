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
  }
}
