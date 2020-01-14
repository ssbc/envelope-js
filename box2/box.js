const na = require('sodium-native')
const xor = require('buffer-xor/inplace')
const derive = require('./derive-secret')
const keySlotFlip = require('./key-slot-flip')

module.exports = function box (plain_text, external_nonce, msg_key, recp_keys, opts = {}) {
  const read_key = derive(msg_key, 'key_type:read_key')
    const header_key = derive(read_key, 'key_type:header_key')
    const body_key   = derive(read_key, 'key_type:body_key')

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

  na.crypto_secretbox_easy(header_box, header, external_nonce, header_key)


  /* key_slots */

  recp_keys.forEach((recp_key, i) => {
    const _key_slot = cyphertext.slice(32 + 32*i, 64 + 32*i)

    msg_key.copy(_key_slot)
    xor(_key_slot, keySlotFlip(external_nonce, recp_key))
  })

  /* extentions */
  // TODO


  /* body_box */
  const body_box = cyphertext.slice(offset)
  na.crypto_secretbox_easy(body_box, plain_text, external_nonce, body_key)

  return cyphertext
}
