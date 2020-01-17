const fs = require('fs')
const { join } = require('path')
const { error_codes } = require('box2-spec/constants.json')
const encodeLeaves = require('./encode-leaves')

module.exports = function print (fileName, vector) {
  if (vector.error_code) {
    if (!(vector.error_code in error_codes)) {
      throw new Error(`invalid error_code code: "${vector.error_code}", see box2-spec/constants.json`)
    }
  }

  const output = JSON.stringify(encodeLeaves(vector), null, 2)

  fs.mkdir(join(__dirname, '../generate/vectors'), { recursive: true }, (err) => {
    if (err) throw err

    fs.writeFile(join(__dirname, '../generate/vectors', fileName), output, (err) => {
      if (err) throw err
    })
  })

  console.log()
  console.log('# box2-spec/vectors/' + fileName)
  console.log(output)
  console.log()
}
