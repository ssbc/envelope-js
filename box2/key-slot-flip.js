const derive = require('./derive-secret')

module.exports = function keySlotFlip (external_nonce, recipient_key) {
  return derive(recipient_key, 'key_slot;prev=' + external_nonce, 32)
}
