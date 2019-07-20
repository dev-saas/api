const AuthService = db => {
  const { User } = db.models

  const login = (email, password) => User.login(email, password)

  const register = (email, password) => User.createNew(email, password)

  return { login, register }
}

module.exports = AuthService
