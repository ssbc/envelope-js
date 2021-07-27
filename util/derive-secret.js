const hkdf = require('futoin-hkdf')
const encode = require('./slp-encode')
const { convertNilForEnvelopeSpec } = require('ssb-bfe')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)
const key_length = 32

module.exports = function DeriveSecret (feed_id, prev_msg_id) {
  prev_msg_id = convertNilForEnvelopeSpec(prev_msg_id, feed_id)

  return function derive (pk, labels, length = key_length) {
    const info = [
      toBuffer('envelope'),
      feed_id,
      prev_msg_id,
      ...(labels.map(toBuffer))
    ]

    if (info.some(i => i.length === 0)) {
      throw new Error('DeriveSecret: zero length info buffer found')
    }

    return hkdf.expand(hash, hash_len, pk, length, encode(info))
  }
}

function toBuffer (el) {
  return (Buffer.isBuffer(el))
    ? el
    : Buffer.from(el, 'utf8')
}
