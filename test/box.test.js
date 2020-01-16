const test = require('tape')
const vector1 = require('box2-spec/vectors/box1.json')

// NOTE - decodeLeaves bulk-converts string-encoded buffers
// back into Buffers so the vector can be used directly
const decodeLeaves = require('./helpers/decode-leaves')
const { box } = require('../')

test('box', t => {
  decodeLeaves(vector1)

  const { plain_text, external_nonce, msg_key, recp_keys } = vector1.input
  const result = box(plain_text, external_nonce, msg_key, recp_keys)

  t.deepEqual(result, vector1.output.ciphertext, 'correctly box for 2 recps')

  t.end()
})

// want vectors for edge cases:
// - plain_text is empty: ''
// - external_nonce - null not allowed
// - no recpient_keys >  vector1.error = 'noRecipientsError'
//   - vector1.error = null when no errors
//
// - any variables missing results in error
