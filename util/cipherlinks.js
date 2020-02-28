const na = require('sodium-native')
const { isBuffer } = Buffer
const TYPES = require('@envelope/spec/encoding/tfk.json')

class Cipherlink {
  constructor (opts = {}) {
    this.type = opts.type
    this.format = opts.format
    this.key = opts.key

    if (this.key) {
      const expected = TYPES[this.type].formats[this.format].key_bytes
      if (this.key.length !== expected) {
        throw new Error(`Cypherlink expected to have key of length ${expected} bytes, got ${this.key.length}`)
      }
    }
  }

  toTFK () {
    return Buffer.concat([
      Buffer.from([this.type]),
      Buffer.from([this.format]),
      this.key
    ])
  }

  // TODO in ssb-private2 can mutate prototype with Cipherlink.prototype.toSSB = ...
  // toSSB () {
  //   const { sigil, suffix } = TYPES[this.type].formats[this.format]

  //   return sigil + this.key.toString('base64') + suffix
  // }

  mock () {
    const bytes = (this.type === null && this.format === null)
      ? 32 //
      : TYPES[this.type].formats[this.format].key_bytes
    this.key = Buffer.alloc(bytes)
    na.randombytes_buf(this.key)

    return this
  }
}

module.exports = {
  Cipherlink
}
