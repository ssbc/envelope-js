module.exports = function slpEncode (arr) {
  let output = Buffer.alloc(0)

  arr.forEach(el => {
    if (!Buffer.isBuffer(el)) throw new Error(`slp.encode expects Buffers, got ${el}`)

    const length = Buffer.alloc(2)
    length.writeInt16LE(el.length)

    output = Buffer.concat([output, length, el])
  })

  return output
}
