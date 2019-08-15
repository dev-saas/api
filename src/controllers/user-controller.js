module.exports = db => {
  const { User } = db.models

  const load = (id, info) => User.load(id, info)

  return { load }
}
