const { box } = require('../../')
const { Key, Nonce, print } = require('../helpers')

/* box for 2 recps */
const a = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key()]
  const msg_key = Key()
  const external_nonce = Nonce()

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
      ciphertext: box(plain_text, external_nonce, msg_key, recp_keys)
    },
    error_code: null
  }
  print('box1.json', boxVector)
}
a()

/* box for empty plain_text "" */
const b = () => {
  const plain_text = Buffer.from('', 'utf8')
  const recp_keys = [Key(), Key(), Key()]
  const msg_key = Key()
  const external_nonce = Nonce()

  const boxVector = {
    type: 'box',
    description: 'cannot box an empty plain_text buffer / string',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: null
    },
    error_code: 'boxEmptyPlainText'
  }
  print('box2.json', boxVector)
}
b()

/* attempt box with no external_nonce */
const c = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key(), Key()]
  const msg_key = Key()
  const external_nonce = null

  const boxVector = {
    type: 'box',
    description: 'box without external_nonce throws error',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: null
    },
    error_code: 'boxEmptyExternalNonce'
  }
  print('box3.json', boxVector)
}
c()

/* zerod external_nonce */
const d = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key(), Key()]
  const msg_key = Key()
  const external_nonce = Nonce().fill(0) // <<<<<< nooo

  const boxVector = {
    type: 'box',
    description: 'box with empty (zero filled) external_nonce throws error',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: null
    },
    error_code: 'boxZerodExternalNonce'
  }
  print('box4.json', boxVector)
}
d()

/* zerod msg_key */
const e = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const recp_keys = [Key(), Key(), Key()]
  const msg_key = Key().fill(0) // <<<<< noooo
  const external_nonce = Nonce()

  const boxVector = {
    type: 'box',
    description: 'box with empty (zero filled) msg_key throws error',
    input: {
      plain_text,
      external_nonce,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: null
    },
    error_code: 'boxZerodMsgKey'
  }
  print('box5.json', boxVector)
}
e()
