const na = require('sodium-native')
const { derive_secret_labels: labels } = require('box2-spec/constants.json')
const { box } = require('../')
const derive = require('../util/derive-secret')
const keySlotFlip = require('../util/key-slot-flip')
const encodeLeaves = require('./helpers/encode-leaves')

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
  const read_key = derive(msg_key, labels.read_key)
    const header_key = derive(read_key, labels.header_key)
    const body_key   = derive(read_key, labels.body_key)

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

print('box2-spec/vectors/derive-secret.json', deriveVector)

/* key-slot-flip test vector */
const F = () => {
  const external_nonce = makeNonce()
  const recipient_key = makeKey()

  const flipVector = {
    type: 'key_slot_flip',
    description: 'in each key-slot, we xor the msg_key with a unique value - the key-slot-flip. this vector tests you made it correctly!',
    input: {
      external_nonce,
      recipient_key
    },
    output: {
      key_slot_flip: keySlotFlip(recipient_key, external_nonce)
    }
  }

  print('box2-spec/vectors/key-slot-flip.json', flipVector)
}
F()


/* box + unbox test vectors */
const A = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [ makeKey(), makeKey() ]
  const msg_key = makeKey()
  const external_nonce = makeNonce()

  const boxed = box(plain_text, external_nonce, msg_key, recp_keys)

  const boxVector = {
    type: 'box',
    description: 'box for 2 recipients',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: boxed
    }
  }
  print('box2-spec/vectors/box1.json', boxVector)

  const unboxVector = {
    type: 'unbox',
    description: 'unbox successfully',
    input: {
      ciphertext: boxed,
      external_nonce,
      recipient_key: recp_keys[1]
    },
    output: {
      plain_text
    }
  }
  print('box2-spec/vectors/unbox1.json', unboxVector)

  const unboxableVector = {
    type: 'unbox',
    description: 'unbox fails with incorrect key, return false',
    input: {
      ciphertext: boxed,
      external_nonce,
      recipient_key: makeKey() // the wrong key
    },
    output: {
      plain_text: null
    }
  }
  print('box2-spec/vectors/unbox2.json', unboxableVector)
}
A()

function print (title, vector) {
  encodeLeaves(vector)

  console.log()
  console.log('# ' + title + ' ')
  console.log(JSON.stringify(vector, null, 2))
  console.log()
}
