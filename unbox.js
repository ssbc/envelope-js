const { Buffer } = require('buffer')
const na = require('sodium-native')
const xor = require('buffer-xor/inplace')
const derive = require('./util/derive-secret')
const keySlotFlip = require('./util/key-slot-flip')
const { derive_secret_labels: labels } = require('box2-spec/constants.json')

module.exports = function unbox (ciphertext, external_nonce, trial_keys, maxAttempts = 8) {
  const read_key = unboxKey(ciphertext, external_nonce, trial_keys, maxAttempts)
  if (!read_key) return null

  return unboxBody(ciphertext, external_nonce, read_key)
}

function unboxKey (ciphertext, external_nonce, trial_keys, maxAttempts) {
  const header_box = ciphertext.slice(0, 32)
  const header = Buffer.alloc(16)

  const _maxAttempts = Math.min(
    maxAttempts,
    (ciphertext.length - 32 - 16) / 32 - 1
    // (ciphertext - header_box - body-hmac) / key_slot - 1
  )
  const msg_key = Buffer.alloc(32)

  for (let i = 0; i < trial_keys.length; i++) {
    const flip = keySlotFlip(trial_keys[i], external_nonce)
    for (let j = 0; j < _maxAttempts; j++) {
      flip.copy(msg_key)
      xor(
        msg_key, // currently "flip", about to be over-written with result of xor
        ciphertext.slice(32 + j*32, 32 + j*32 + 32)
      )

      const read_key = derive(msg_key, labels.read_key)
        const header_key = derive(read_key, labels.header_key)

      if (na.crypto_secretbox_open_easy(header, header_box, external_nonce, header_key)) {
        return read_key
      }
    }
  }
}

function unboxBody (ciphertext, external_nonce, read_key) {
  const header = Buffer.alloc(16)
  const header_box = ciphertext.slice(0, 32)
  const header_key = derive(read_key, labels.header_key)
  na.crypto_secretbox_open_easy(header, header_box, external_nonce, header_key)

  const offset = header.readUInt16LE(0)

  const body = Buffer.alloc(ciphertext.length - offset - 16)
  const body_box = ciphertext.slice(offset)
  const body_key   = derive(read_key, labels.body_key)
  na.crypto_secretbox_open_easy(body, body_box, external_nonce, body_key)

  return body
}
