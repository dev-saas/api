module.exports = () => {
  return {
    check: (objId, _id, contextUser = null) =>
      contextUser ? (objId.toString() === _id) === contextUser : objId.toString() === _id
  }
}
