const { derive_secret_labels: labels } = require('box2-spec/constants.json')
const derive = require('../../util/derive-secret')

const { Key, print } = require('../helpers')

/* derive-secret test vector */
const msg_key = Key()
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

print('derive-secret.json', deriveVector)
