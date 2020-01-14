const test = require('tape')
const vector1 = require('box2-spec/test/unbox1.json')

const decodeLeaves = require('./generate/decode-leaves')
const unbox = require('../box2/unbox')

test('unbox', t => {
  decodeLeaves(vector1)

  const { ciphertext, external_nonce, recipient_key } = vector1.input
  const result = unbox(ciphertext, external_nonce, [recipient_key])

  t.deepEqual(result, vector1.output.plain_text, 'unbox successfully')

  t.end()
})
