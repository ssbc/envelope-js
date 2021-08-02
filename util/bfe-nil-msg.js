const { bfeNamedTypes } = require('ssb-bfe')
const error = require('./error')

const GENERIC = bfeNamedTypes['generic']
const NIL_TFD = Buffer.from([GENERIC.code, GENERIC.formats['nil'].code])

const FEED = bfeNamedTypes['feed']
const CLASSIC_FEED_TF = Buffer.from([FEED.code, FEED.formats['ssb/classic'].code])
const GABBYGR_FEED_TF = Buffer.from([FEED.code, FEED.formats['ssb/gabby-grove'].code])
const BENDYBT_FEED_TF = Buffer.from([FEED.code, FEED.formats['ssb/bendy-butt'].code])

const MSG = bfeNamedTypes['msg']
const CLASSIC_MSG_TF = Buffer.from([MSG.code, MSG.formats['ssb/classic'].code])
const GABBYGR_MSG_TF = Buffer.from([MSG.code, MSG.formats['ssb/gabby-grove'].code])
const BENDYBT_MSG_TF = Buffer.from([MSG.code, MSG.formats['ssb/bendy-butt'].code])

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

