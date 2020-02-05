const { box } = require('../../')
const { FeedId, PrevMsgId, Key, print } = require('../helpers')

/* box for 2 recps */
const a = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const feed_id = FeedId()
  const prev_msg_id = PrevMsgId()
  const msg_key = Key()
  const recp_keys = [Key(), Key()]

  const boxVector = {
    type: 'box',
    description: 'box for 2 recipients',
    input: {
      plain_text,
      feed_id,
      prev_msg_id,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys)
    },
    error_code: null
  }
  print('box1.json', boxVector)
}
a()

/* box for empty plain_text "" */
const b = () => {
  const plain_text = Buffer.from('', 'utf8') // <------ no!
  const feed_id = FeedId()
  const prev_msg_id = PrevMsgId()
  const msg_key = Key()
  const recp_keys = [Key(), Key(), Key()]

  const boxVector = {
    type: 'box',
    description: 'cannot box an empty plain_text buffer / string',
    input: {
      plain_text,
      feed_id,
      prev_msg_id,
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

/* zerod msg_key */
const c = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const feed_id = FeedId()
  const prev_msg_id = PrevMsgId()
  const msg_key = Key().fill(0) // <------------ no!
  const recp_keys = [Key(), Key(), Key()]

  const boxVector = {
    type: 'box',
    description: 'box with empty (zero filled) msg_key throws error',
    input: {
      plain_text,
      feed_id,
      prev_msg_id,
      msg_key,
      recp_keys
    },
    output: {
      ciphertext: null
    },
    error_code: 'boxZerodMsgKey'
  }
  print('box3.json', boxVector)
}
c()
