module.exports = function slpEncode (arr) {
  var output = Buffer.alloc(0)

  arr.forEach(el => {
    const length = Buffer.alloc(2)
    length.writeInt16LE(el.length)

    output = Buffer.concat([output, length, el])
  })

  return output
}
