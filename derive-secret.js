const hkdf = require('futoin-hkdf')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)
const key_length = 32

module.exports = function deriveSecret (pk, description, length = key_length) {
  return hkdf.expand(hash, hash_len, pk, length, description)
}
