# envelope-js

A javascript tool for cryptographically "boxing" and "unboxing" messages
following the [envelope-spec](https://github.com/ssbc/envelope-spec).

envelope supports encryption to individuals and groups

## Example Usage

...

## API

### `box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys) => ciphertext`

where:
- `plain_text` *Buffer* is the content to be "enveloped"
- `feed_id` *Buffer* is a type-format-key (TFK) encoded value for the feed authoring a message
- `prev_msg_id` *Buffer* is a TFK encoded value of the id of last message of this feeds chain
- `msg_key` *Buffer* a randomised 32 Bytes which will be the unique key for this message
- `recps_keys` *Array* is a collection of items of form `{ key, scheme }`, where
    - `key` *Buffer* is the key the particular recipient
    - `scheme` *String* is the type of key / the key management scheme for this recipient


### `unbox(ciphertext, feed_id, prev_msg_id, trial_keys, max_attempts) => plain_text | null`

...

## License

MIT
