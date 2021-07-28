const TYPES = require('ssb-binary-field-encodings-spec/bfe.json')
const error = require('./error')

const NIL_TFD = Buffer.from([TYPES[6].code, TYPES[6].formats[2].code])

const FEED = TYPES[0]
const CLASSIC_FEED_TF = Buffer.from([FEED.code, FEED.formats[0].code])
const GABBYGR_FEED_TF = Buffer.from([FEED.code, FEED.formats[1].code])
const BENDYBT_FEED_TF = Buffer.from([FEED.code, FEED.formats[3].code])

const MSG = TYPES[1]
const CLASSIC_MSG_TF = Buffer.from([MSG.code, MSG.formats[0].code])
const GABBYGR_MSG_TF = Buffer.from([MSG.code, MSG.formats[1].code])
const BENDYBT_MSG_TF = Buffer.from([MSG.code, MSG.formats[4].code])

module.exports = function convertBFENilMsg(msgTFD, feedTFK) {
  if (msgTFD.equals(NIL_TFD)) {
    const feedTF = feedTFK.slice(0, 2)
    if (feedTF.equals(BENDYBT_FEED_TF))
      return Buffer.concat([BENDYBT_MSG_TF, Buffer.alloc(32)])
    else if (feedTF.equals(GABBYGR_FEED_TF))
      return Buffer.concat([GABBYGR_MSG_TF, Buffer.alloc(32)])
    else if (feedTF.equals(CLASSIC_FEED_TF))
      return Buffer.concat([CLASSIC_MSG_TF, Buffer.alloc(32)])
    else
      throw error('Unknown feed type', feedTF)
  } else
    return msgTFD
}

