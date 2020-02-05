const { Buffer } = require('buffer')
const na = require('sodium-native')
const xor = require('buffer-xor/inplace')
const labels = require('box2-spec/derive_secret/constants.json')

const { Derive, error } = require('./util')
const zerodNonce = Buffer.alloc(na.crypto_secretbox_NONCEBYTES)
const zerodMsgKey = Buffer.alloc(na.crypto_secretbox_KEYBYTES)

module.exports = function box (plain_text, feed_id, prev_msg_id, msg_key, recp_keys) { // TODO opts = {}
  if (!plain_text.length) throw error('boxEmptyPlainText')
  if (msg_key.equals(zerodMsgKey)) throw error('boxZerodMsgKey')

  const derive = Derive(feed_id, prev_msg_id)

  const read_key = derive(msg_key, labels.read_key)
    const header_key = derive(read_key, labels.header_key)
    const body_key   = derive(read_key, labels.body_key)

  const offset = (
    32 +                    // header_box
    recp_keys.length * 32   // key_slots
    // ??                   // TODO - extensions section
  )

  const cyphertext = Buffer.alloc(
    offset +                // length of bytes before body_box
    plain_text.length + 16  // body_box = body + HMAC
  )

  /* header_box */
  const header_box = cyphertext.slice(0, 32)
    const header = header_box.slice(16)
    header.writeUInt16LE(offset, 0)
    /*
    header.write...(flags, 2)
    header.write...(header_extensions, 3)
    */

  na.crypto_secretbox_easy(header_box, header, zerodNonce, header_key)


  /* key_slots */
  recp_keys.forEach((recp_key, i) => {
    const _key_slot = cyphertext.slice(32 + 32*i, 64 + 32*i)

    msg_key.copy(_key_slot)
    xor(_key_slot, derive(recp_key, labels.slot_key))
  })

  /* extentions */
  // TODO


  /* body_box */
  const body_box = cyphertext.slice(offset)
  na.crypto_secretbox_easy(body_box, plain_text, zerodNonce, body_key)

  return cyphertext
}
