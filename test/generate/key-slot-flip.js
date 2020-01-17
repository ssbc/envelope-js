const keySlotFlip = require('../../util/key-slot-flip')
const { Key, Nonce, print } = require('../helpers')

/* key-slot-flip test vector */
const external_nonce = Nonce()
const recipient_key = Key()

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

print('key-slot-flip.json', flipVector)
