const { box } = require('../../')
const { FeedId, PrevMsgId, Key, print } = require('../helpers')

/* happy unbox */
const a = () => {
  const plain_text = Buffer.from('squeamish ossifrage 😨', 'utf8')
  const feed_id = FeedId()
  const prev_msg_id = PrevMsgId()
  const msg_key = Key()
  const recp_keys = [Key(), Key()]

  const boxed = box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys)

  const unboxVector = {
    type: 'unbox',
    description: 'unbox successfully',
    input: {
      ciphertext: boxed,
      feed_id,
      prev_msg_id,
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
