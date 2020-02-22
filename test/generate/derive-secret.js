const labels = require('box2-spec/derive_secret/constants.json')
const Derive = require('../../util/derive-secret')

const { FeedId, PrevMsgId, Key, print } = require('../helpers')

const feed_id = FeedId()
const prev_msg_id = PrevMsgId()
const derive = Derive(feed_id, prev_msg_id)

const msg_key = Key()
  const read_key = derive(msg_key, [labels.read_key])
    const header_key = derive(read_key, [labels.header_key])
    const body_key   = derive(read_key, [labels.body_key])

const deriveVector = {
  type: 'derive_secret',
  description: 'All keys in the output should be able to be generated from the input by implementing DeriveSecret correctly.  Use labels from box2-spec/derive_secret/constants.json',
  input: {
    feed_id,
    prev_msg_id,
    msg_key
  },
  output: {
    read_key,
    header_key,
    body_key
  }
}

print('derive_secret.json', deriveVector)
