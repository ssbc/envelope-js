const test = require('tape')
const vector1 = require('box2-spec/test/box1.json')

const decodeLeaves = require('./generate/decode-leaves')
const box = require('../box2/box')

test('box', t => {
  decodeLeaves(vector1)

  const { plain_text, external_nonce, msg_key, recp_keys  } = vector1.input
  const result = box(plain_text, external_nonce, msg_key, recp_keys)

  t.deepEqual(result, vector1.output.cyphertext, 'correctly box for 2 recps')

  t.end()
})
