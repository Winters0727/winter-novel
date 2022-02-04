const crypto = require('crypto');

exports.createHashPassword = password => {
  const salt = crypto.randomBytes(64);
  return crypto
    .pbkdf2Sync(password, salt.toString('base64'), 100000, 64, 'sha512')
    .toString('base64');
};
