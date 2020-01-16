const derive = require('./derive-secret')

module.exports = function keySlotFlip (recipient_key, external_nonce) {
  return derive(recipient_key, external_nonce, 32)
}
