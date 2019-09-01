module.exports = {
  queryMe: {
    query: `
      query {
        me {
          _id
          uid
          username
          email
          posts {
            nodes {
              message
            }
          }
          followers {
            nodes {
              username
            }
          }
          following {
            nodes {
              username
            }
          }
          notifications {
            nodes {
              message
            }
          }
        }
      }
    `
  },
  querySearch: {
    query: `
      query ($username: Username!, $page: PageInput) {
        users(username: $username, page: $page) {
          cursor
          hasNextPage
          nodes {
            username
          }
        }
      }
    `
  },
  queryUser: {
    query: `
      query ($username: Username!) {
        user(username: $username) {
          username
          email
        }
      }
    `
  },
  mutationUpdate: {
    query: `
      mutation ($user: UpdateUserInput!) {
        updateUser(user: $user){
          username
        }
      }
    `
  },
  mutationFollow: {
    query: `
      mutation ($uid: ID!) {
        follow(uid: $uid)
      }
    `
  }
}
