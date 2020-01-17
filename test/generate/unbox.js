const { box } = require('../../')
const { Key, Nonce, print } = require('../helpers')

/* happy unbox */
const a = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key()]
  const msg_key = Key()
  const external_nonce = Nonce()

  const boxed = box(plain_text, external_nonce, msg_key, recp_keys)

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
    },
    error_code: null
  }
  print('unbox1.json', unboxVector)
}
a()

/* missing external_nonce */
const b = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key()]
  const msg_key = Key()
  const external_nonce = Nonce()

  const boxed = box(plain_text, external_nonce, msg_key, recp_keys)

  const unboxableVector = {
    type: 'unbox',
    description: 'missing external nonce',
    input: {
      ciphertext: boxed,
      external_nonce: null,
      recipient_key: recp_keys[1]
    },
    output: {
      plain_text: null
    },
    error_code: 'unboxEmptyExternalNonce'
  }
  print('unbox2.json', unboxableVector)
}
b()
