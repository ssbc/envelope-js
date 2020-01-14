const test = require('tape')
const vector1 = require('box2-spec/test/unbox1.json')
const vector2 = require('box2-spec/test/unbox2.json')

const decodeLeaves = require('./generate/decode-leaves')
const unbox = require('../box2/unbox')

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
