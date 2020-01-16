const test = require('tape')
const vector1 = require('box2-spec/vectors/unbox1.json')
const vector2 = require('box2-spec/vectors/unbox2.json')

// NOTE - decodeLeaves bulk-converts string-encoded buffers
// back into Buffers so the vector can be used directly
const decodeLeaves = require('./helpers/decode-leaves')
const { unbox } = require('../')

test('unbox', t => {
  decodeLeaves(vector1)
  decodeLeaves(vector2)

  var { ciphertext, external_nonce, recipient_key } = vector1.input
  var result = unbox(ciphertext, external_nonce, [recipient_key])
  t.deepEqual(result, vector1.output.plain_text, 'unbox successfully')

  var { ciphertext, external_nonce, recipient_key } = vector2.input
  var result = unbox(ciphertext, external_nonce, [recipient_key])
  t.deepEqual(result, vector2.output.plain_text, 'unbox fails (without correct key)')

  t.end()
})
