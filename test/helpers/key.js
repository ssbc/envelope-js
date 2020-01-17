const na = require('sodium-native')
const KEY_LENGTH = na.crypto_secretbox_KEYBYTES

module.exports = function makeKey () {
  const key = na.sodium_malloc(KEY_LENGTH)
  na.randombytes_buf(key)

  return key
}

