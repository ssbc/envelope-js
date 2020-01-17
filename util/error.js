const { error_codes } = require('box2-spec/constants.json')

module.exports = function box2error (code) {
  if (!(code in error_codes)) {
    throw new Error(`trying to throw error with unknown code: ${code}`)
  }

  const error = new Error(`${code}: ${error_codes[code]}`)
  error.code = code

  return error
}
