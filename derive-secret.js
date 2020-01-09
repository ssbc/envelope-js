const hkdf = require('futoin-hkdf')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)

module.exports = function deriveSecret (pk, description, length) {
  return hkdf.expand(hash, hash_len, pk, length, description)
}
