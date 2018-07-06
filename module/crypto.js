const crypto = require('crypto');
exports.crypto = function(data){
  str = crypto.createHash('sha1')
    .update(data)
    .digest('hex');
  return str;
}
