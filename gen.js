var crypto = require('crypto')


console.log(gpass())

function gpass(){
  return crypto
    .createHash('sha1')
    .update(Date.now()+'barney')
    .digest('hex')
    .slice(0,6)
}
