const hkdf = require('futoin-hkdf')
const encode = require('./slp-encode')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)
const key_length = 32

module.exports = function Derive (feed_id, prev_msg_id) {
  return function derive (pk, label, length = key_length) {
    const info = [
      feed_id,
      prev_msg_id,
      Buffer.isBuffer(label) ? label : Buffer.from(label, 'utf8')
    ]

    return hkdf.expand(hash, hash_len, pk, length, encode(info))
  }
}
