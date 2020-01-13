module.exports = function decodeLeaves (vector) {
  Object.entries(vector.input)
    .forEach(([key, value]) => {
      vector.input[key] = Array.isArray(value)
        ? value.map(decode)
        : decode(value)
    })

  Object.entries(vector.output)
    .forEach(([key, value]) => {
      vector.output[key] = Array.isArray(value)
        ? value.map(decode)
        : decode(value)
    })

  return vector
}

function decode (value) {
  return Buffer.from(value, 'base64')
}
