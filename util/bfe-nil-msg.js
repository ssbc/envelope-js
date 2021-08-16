const { toTF } = require('ssb-bfe')
const error = require('./error')

const NIL_TFD = toTF('generic', 'nil')

const CLASSIC_FEED_TF = toTF('feed', 'classic')
const GABBYGR_FEED_TF = toTF('feed', 'gabby-grove')
const BENDYBT_FEED_TF = toTF('feed', 'bendy-butt')

const CLASSIC_MSG_TF = toTF('msg', 'classic')
const GABBYGR_MSG_TF = toTF('msg', 'gabby-grove')
const BENDYBT_MSG_TF = toTF('msg', 'bendy-butt')

const ZEROS = Buffer.alloc(32)

module.exports = function convertBFENilMsg (msgTFD, feedTFK) {
  if (!msgTFD.equals(NIL_TFD)) return msgTFD

  const feedTF = feedTFK.slice(0, 2)
  if (feedTF.equals(CLASSIC_FEED_TF)) return Buffer.concat([CLASSIC_MSG_TF, ZEROS])
  if (feedTF.equals(GABBYGR_FEED_TF)) return Buffer.concat([GABBYGR_MSG_TF, ZEROS])
  if (feedTF.equals(BENDYBT_FEED_TF)) return Buffer.concat([BENDYBT_MSG_TF, ZEROS])

  throw error('Unknown feed type', feedTF)
}
