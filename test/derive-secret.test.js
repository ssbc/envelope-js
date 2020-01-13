const test = require('tape')
const vector = require('box2-spec/test/derive-secret.json')

const decodeLeaves = require('./generate/decode-leaves')
const derive = require('../box2/derive-secret')

test('derive-secret', t => {
  decodeLeaves(vector)

  const msg_key = vector.input.msg_key
    const read_key = derive(msg_key, 'key_type:read_key')
      const header_key = derive(read_key, 'key_type:header_key')
      const body_key   = derive(read_key, 'key_type:body_key')

  t.deepEqual(read_key, vector.output.read_key, 'derive read_key')
  t.deepEqual(header_key, vector.output.header_key, 'derive header_key')
  t.deepEqual(body_key, vector.output.body_key, 'derive body_key')

  t.end()
})
