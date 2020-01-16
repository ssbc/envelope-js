const test = require('tape')
const vector = require('box2-spec/vectors/key-slot-flip.json')
const { derive_secret_labels: labels } = require('box2-spec/constants.json')

const decodeLeaves = require('./helpers/decode-leaves')
const keySlotFlip = require('../util/derive-secret')

test('key-slot-flip', t => {
  decodeLeaves(vector)

  const { external_nonce, recipient_key } = vector.input

  console.log(vector)
  console.log(external_nonce)
  console.log(recipient_key)

  t.deepEqual(
    keySlotFlip(recipient_key, external_nonce),
    vector.output.key_slot_flip,
    'calculated correct key-slot-flip for xor'
  )

  t.end()
})
