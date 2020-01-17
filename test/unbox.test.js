const test = require('tape')
// NOTE - decodeLeaves bulk-converts string-encoded buffers
// back into Buffers so the vector can be used directly
const decodeLeaves = require('./helpers/decode-leaves')
const { unbox } = require('../')

const vectors = [
  require('box2-spec/vectors/unbox1.json'),
  require('box2-spec/vectors/unbox2.json')
]

test('unbox', t => {
  t.plan(vectors.length)

  vectors.forEach(vector => {
    decodeLeaves(vector)
    var { ciphertext, external_nonce, recipient_key } = vector.input

    if (!vector.error_code) {

      t.deepEqual(
        unbox(ciphertext, external_nonce, [recipient_key]),
        vector.output.plain_text,
        vector.description
      )   
    }
    else {
      try {
        unbox(ciphertext, external_nonce, [recipient_key])
      } catch (e) {
        t.equal(
          e.code,
          vector.error_code,
          vector.description
        )
      }
    }
  })
})
