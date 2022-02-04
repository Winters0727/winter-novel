const crypto = require('crypto');

const salt = crypto.randomBytes(64);

exports.createHashPassword = password => {
  return crypto
    .pbkdf2Sync(password, salt.toString('base64'), 100000, 64, 'sha512')
    .toString('base64');
};
