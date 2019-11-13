var na = require('sodium-native')

function derive_secret (secret, label, length) {
  return hkdf(secret, label, length || 256)
}

/*
msg_key

msg_read_cap  = derive(msg_key, 'read_cap')
  hdr_key     = derive(msg_read_cap, 'header')
  body_key    = derive(msg_read_cap, 'body')
    box       = derive(body_key, 'box')
    box_nonce = derive(body_key, 'box_nonce', 192)

ext           = derive(msg_key, 'ext')
  eph         = derive(ext, 'eph')
    n_eph_pad = derive(eph, 'n_eph_pad', 8)
    ext_box   = derive(eph, 'box')
    ext_nonce = derive(eph, 'box_nonce', 192)


header_box[32](mac_tag[16], header[16](offset[2],flags[1],hdr_ext[13])
*/

exports.box = function (ptxt, external_nonce, msg_key, recipient_keys, ephemerals, padding) {

  if(ephemerals) throw new Error('ephemerals not yet implemented')

  var msg_read_cap  = derive(msg_key, 'read_cap')
  var hdr_key     = derive(msg_read_cap, 'header')


  var header_length = (
    32
  + (32 * recipient_keys)
  + (ephemerals.length ? 32 * (ephemerals.length + 1) : 0)
  + padding ? padding.length : 0
  )

  var length = (header_length + ptxt.length)

  var buffer = Buffer.alloc(length)
  var header_box = buffer.slice(0,32)

  var _header = Buffer.alloc(16)
  _header.writeUInt32LE(0, header_length)

  na.crypto_box_easy(header_box, _header, hdr_key, nonce??) //XXX nonce??

  recipients_keys.forEach(function (key, i) {
    //xor msg_key with recipient[i] and store result in bytes 32...32+32*recipients.length
    //note, if you only know read_cap you don't know msg_key so can't derive msg_key
    na.crypto_xor(buffer.slice(32 + 32*i, 64 + 32*i), key, msg_key)
  //extentions. not supported yet.
  if(padding)
    padding.copy(buffer, header_length-padding.length)

  var body = buffer.slice(header_length)

  var body_key    = derive(msg_read_cap, 'body')
    var box       = derive(body_key, 'box')
    var box_nonce = derive(body_key, 'box_nonce', 192)

  na.crypto_box_easy(body, message, box, box_nonce)

  return buffer
}

exports.unboxKey = function (ctxt, external_nonce, trail_keys, attempts) {
  var header_box = ctxt.slice(0, 32)
  var _msg_key = Buffer.alloc(32), header_ptxt = Buffer.alloc(16)
  for(var i = 0; i < trail_keys.length; i++) {
    for(var j = 0; j < attempts; j++) {
      var trial = trail_keys[i]
      na.xor(_msg_key, trail, ctxt.slice(32+j*32))
      var read_cap = derive(_msg_key, 'read_cap')
      var header = derive(_msg_key, 'header')
      if(na.crypto_unbox_easy(header_ptxt, header_box, header, nonce??)) //XXX nonce??
        return read_cap
    }
  }
}

exports.unboxBody = function (ctxt, external_nonce, read_cap) {
  var header_ptxt = Buffer.alloc(16)
  var header_box = ctxt.slice(0, 32)
  var header_key = derive(read_cap, 'header')
  if(!crypto_unbox_easy(header_ptxt, header_box, header_key, nonce??))
    return

  var offset = header_ptxt.readUInt32LE(0)
  var ptxt = Buffer.alloc(ctxt.length - offset)
  var body_key = derive(read_cap, 'body')
  if(na.crypto_unbox_easy(ptxt, ctxt.slice(offset), derive(body_key, 'box'), derive(body_key, 'box_nonce'))
    return ptxt
  return null
}
