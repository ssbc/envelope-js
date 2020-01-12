// generate test vector

const na = require('sodium-native')
const derive = require('../derive-secret')

const KEY_LENGTH = 32
function makeKey () {
  const key = Buffer.alloc(KEY_LENGTH)
  na.randombytes_buf(key)
  return key
}

const msg_key = makeKey()
  const read_key = derive(msg_key, "key_type:read_key", KEY_LENGTH)
    const header_key = derive(read_key, "key_type:header_key", KEY_LENGTH)
    const body_key   = derive(read_key, "key_type:body_key", KEY_LENGTH)

const newVector = {
  type: 'derive_secret',
  description: 'all keys in the output should be able to be generated from input.msg_key by using DeriveKeys correctly following the spec.',
  input: {
    msg_key: msg_key.toString('base64')
  },
  output: {
    read_key: read_key.toString('base64'),
    header_key: header_key.toString('base64'),
    body_key: body_key.toString('base64')
  }
}

console.log('\n\n# test vector for derive-secret\n')
console.log(JSON.stringify(newVector, null, 2))
