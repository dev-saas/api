module.exports = {
  infoToProjection: ({ fieldNodes }) => {
    let requestedAttributes = {}
    fieldNodes[0].selectionSet.selections.map(
      ({ name: { value } }) => (requestedAttributes[value] = 1)
    )
    return requestedAttributes
  }
}
