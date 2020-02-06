const hkdf = require('futoin-hkdf')
const encode = require('./slp-encode')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)
const key_length = 32

module.exports = function Derive (feed_id, prev_msg_id) {
  return function derive (pk, labels, length = key_length) {
    const info = [
      'box2',
      feed_id,
      prev_msg_id,
      ...labels
    ].map(bufferise)

    return hkdf.expand(hash, hash_len, pk, length, encode(info))
  }
}

function bufferise (el) {
  if (el.length === 0) {
    throw new Error(`zero length buffer/ string found: ${el}`)
  }

  return Buffer.isBuffer(el)
    ? el
    : Buffer.from(el, 'utf8')
}
