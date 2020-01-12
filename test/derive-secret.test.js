const test = require('tape')
const vector = require('box2-spec/test/derive-secret.json')

const derive = require('../derive-secret')

test('derive-secret', t => {
  const { input, output } = vector

  const msg_key = Buffer.from(input.msg_key, 'base64')
    const read_key = derive(msg_key, 'key_type:read_key')
      const header_key = derive(read_key, 'key_type:header_key')
      const body_key   = derive(read_key, 'key_type:body_key')

  t.equal(read_key.toString('base64'), output.read_key, 'derive read_key')
  t.equal(header_key.toString('base64'), output.header_key, 'derive header_key')
  t.equal(body_key.toString('base64'), output.body_key, 'derive body_key')

  t.end()
})
