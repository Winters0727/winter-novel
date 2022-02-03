const crypto = require('crypto');

exports.createHashPassword = password => {
  return crypto.createHash('sha512').update(password).digest('base64');
};
