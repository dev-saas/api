module.exports = {
  queryLogin: {
    query: `
      query ($email: Email!, $password: String!) {
        token: login(email: $email password: $password)
      }
    `
  }
}
