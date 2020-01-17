const derive = require('./derive-secret')
const keySlotFlip = require('./key-slot-flip')
const error = require('./error')

module.exports = {
  derive,
  keySlotFlip,
  error
}
