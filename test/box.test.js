const test = require('tape')
const vectors = [
  require('envelope-spec/vectors/box1.json'),
  require('envelope-spec/vectors/box2.json'),
  require('envelope-spec/vectors/box3.json')
]

// NOTE - decodeLeaves bulk-converts string-encoded buffers
// back into Buffers so the vector can be used directly
const decodeLeaves = require('./helpers/decode-leaves')
const { box } = require('../')

test('box', t => {
  t.plan(vectors.length)

  vectors.forEach(vector => {
    decodeLeaves(vector)
    const { plain_text, feed_id, prev_msg_id, msg_key, recp_keys } = vector.input

    if (!vector.error_code) {
      t.deepEqual(
        box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys),
        vector.output.ciphertext,
        vector.description
      )
    }
    else {
      try {
        box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys)
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
