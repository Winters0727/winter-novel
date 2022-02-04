const crypto = require('crypto');

exports.createHashPassword = password => {
  return crypto
    .pbkdf2Sync(password, process.env.HASH_SALT, 100000, 64, 'sha512')
    .toString('base64');
};
