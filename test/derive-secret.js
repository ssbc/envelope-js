const test = require('tape')

const derive = require('../derive-secret')

const vector = {
  "type": "derive_secret",
  "description": "all keys in the output should be able to be generated from input.msg_key by using DeriveKeys correctly following the spec.",
  "input": {
    "msg_key": "lVlvYwgd3zuT8MOd0tUJ3m4zMUnvFDGNNurYe/2vzAg="
  },
  "output": {
    "read_key": "/EhA1WJ7M/OYxXTrnDdODlVVlvaSKQlhvKFZh+MNOUk=",
    "header_key": "fF3uZ4X+uHQv9dE7Yz9Jzk2btCexjbzeMN+JcOAcE2E=",
    "body_key": "LMewFBx5p8NCzNWysGx8t1k22uS8JfKGHbcJTVipvag="
  }
}

test('derive-secret', t => {
  const { input, output } = vector

  const keyLength = 32

  const msg_key = Buffer.from(input.msg_key, 'base64')
    const read_key = derive(msg_key, 'key_type:read_key', keyLength)
      const header_key = derive(read_key, 'key_type:header_key', keyLength)
      const body_key   = derive(read_key, 'key_type:body_key', keyLength)

  t.equal(read_key.toString('base64'), output.read_key, 'derive read_key')
  t.equal(header_key.toString('base64'), output.header_key, 'derive header_key')
  t.equal(body_key.toString('base64'), output.body_key, 'derive body_key')

  t.end()
})

// generate test vector
//
// const na = require('sodium-native')
// const msg_key = Buffer.alloc(32)
// na.randombytes_buf(msg_key)

//   const keyLength = 32
//   const read_key = derive(msg_key, "key_type:read_key", keyLength)
//     const header_key = derive(read_key, "key_type:header_key", keyLength)
//     const body_key   = derive(read_key, "key_type:body_key", keyLength)

// const newVector = {
//   type: 'derive_secret',
//   description: 'all keys in the output should be able to be generated from input.msg_key by using DeriveKeys correctly following the spec.',
//   input: {
//     msg_key: msg_key.toString('base64')
//   },
//   output: {
//     read_key: read_key.toString('base64'),
//     header_key: header_key.toString('base64'),
//     body_key: body_key.toString('base64')
//   }
// }

// console.log(JSON.stringify(newVector, null, 2))
