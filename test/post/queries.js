module.exports = {
  queryPost: {
    query: `
      query ($id: ID!) {
        post (id: $id) {
          _id
          message
          owner {
            username
          }
          comments{
            hasNextPage
            cursor
            nodes{
              owner{
                username
              }
              message
            }
          }
        }
      }    
    `
  },
  queryPosts: {
    query: `
      query ($page: PageInput) {
        posts(page: $page){
          cursor
          hasNextPage
          nodes {
            _id
            message
          }
        }
      }
    `
  },
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
  },
  mutationDeletePost: {
    query: `
      mutation ($id: ID!) {
        deletePost(id: $id){
          _id
          message
        }
      }
    `
  }
}
