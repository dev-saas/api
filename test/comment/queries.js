module.exports = {
  mutationCommentPost: {
    query: `
      mutation ($comment: CommentPostInput!) {
        commentPost(comment: $comment){
          _id
          message
          owner {
            username
          }
          post {
            owner {
              username
            }
          }
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
