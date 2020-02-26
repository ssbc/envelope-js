# envelope-js

A javascript tool for cryptographically "boxing" and "unboxing" messages
following the [envelope-spec](https://github.com/ssbc/envelope-spec).

envelope supports encryption to individuals and groups

## Example Usage

...

## API

### `box(plain_text, feed_id, prev_msg_id, msg_key, recp_keys) => ciphertext`

...


### `unbox(ciphertext, feed_id, prev_msg_id, trial_keys, max_attempts) => plain_text | null`

...

## License

MIT
