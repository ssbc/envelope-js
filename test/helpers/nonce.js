const na = require('sodium-native')

module.exports = function makeNonce () {
  const nonce = Buffer.alloc(na.crypto_secretbox_NONCEBYTES)
  na.randombytes_buf(nonce)

  return nonce
}
