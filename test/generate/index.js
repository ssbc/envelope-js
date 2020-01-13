const na = require('sodium-native')
const derive = require('../../box2/derive-secret')
const box = require('../../box2/box') 
const encodeLeaves = require('./encode-leaves')

const KEY_LENGTH = na.crypto_secretbox_KEYBYTES
function makeKey () {
  const key = na.sodium_malloc(KEY_LENGTH)
  na.randombytes_buf(key)
  return key
}

function makeNonce () {
  const nonce = Buffer.alloc(na.crypto_secretbox_NONCEBYTES)
  na.randombytes_buf(nonce)
  return nonce
}

/* derive-secret test vector */

const msg_key = makeKey()
  const read_key = derive(msg_key, 'key_type:read_key', KEY_LENGTH)
    const header_key = derive(read_key, 'key_type:header_key', KEY_LENGTH)
    const body_key   = derive(read_key, 'key_type:body_key', KEY_LENGTH)

const deriveVector = {
  type: 'derive_secret',
  description: 'all keys in the output should be able to be generated from input.msg_key by using DeriveKeys correctly following the spec.',
  input: {
    msg_key
  },
  output: {
    read_key,
    header_key,
    body_key
  }
}

print('box2-spec/test/derive-secret.json', deriveVector)


/* box test vectors */

const A = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [ makeKey(), makeKey() ]
  const msg_key = makeKey()
  const external_nonce = makeNonce()

  const boxed = box(plain_text, msg_key, external_nonce, recp_keys)

  const  boxVector = {
    type: 'box',
    description: 'box for 2 recipients',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      cyphertext: boxed
    }
  }

  print('box2-spec/test/box1.json', boxVector)
}
A()

function print (title, vector) {
  encodeLeaves(vector)

  console.log()
  console.log('# ' + title + ' ')
  console.log(JSON.stringify(vector, null, 2))
  console.log()
}
