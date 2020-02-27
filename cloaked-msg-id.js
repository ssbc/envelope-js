const na = require('sodium-native')
const hkdf = require('futoin-hkdf')
const labels = require('envelope-spec/cloaked_id/constants.json')

const encode = require('./util/slp-encode')

const hash = 'sha256'
const hash_len = hkdf.hash_length(hash)
const length = 32

module.exports = class CloakedMsgId {
  constructor (public_msg_id, read_key) {
    if (!public_msg_id && !read_key) {
      this.key = null
      return
    }
   
    var info = [
      Buffer.from(labels.cloaked_msg_id, 'utf8'),
      public_msg_id
    ]

    this.key = hkdf.expand(hash, hash_len, read_key, length, encode(info))
  }

  toBuffer () {
    if (this.key === null) throw new Error('CloakedMsgId had null key value')
    return this.key
  }

  mock () {
    this.key = Buffer.alloc(length)
    na.randombytes_buf(this.key)

    return this
  }
}
