const na = require('sodium-native')

const decodeLeaves = require('./decode-leaves')
const encodeLeaves = require('./encode-leaves')
const print = require('./print')

module.exports = {
  FeedId,
  PrevMsgId,
  Key,
  Nonce,
  decodeLeaves,
  encodeLeaves,
  print
}

function FeedId () {
  const code = Buffer.from([0]) // ed25519 feed
  const id = Buffer.alloc(32)
  na.randombytes_buf(id)

  return Buffer.concat([code, id])
}

function PrevMsgId () {
  const code = Buffer.from([1]) // sha256 message
  const id = Buffer.alloc(32)
  na.randombytes_buf(id)

  return Buffer.concat([code, id])
}

function Key () {
  const key = na.sodium_malloc(na.crypto_secretbox_KEYBYTES)
  na.randombytes_buf(key)

  return key
}

function Nonce () {
  const nonce = Buffer.alloc(na.crypto_secretbox_NONCEBYTES)
  na.randombytes_buf(nonce)

  return nonce
}
