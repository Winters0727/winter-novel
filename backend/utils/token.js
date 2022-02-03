const jwt = require('jsonwebtoken');

exports.createToken = async (payload, expire = 86400) => {
  try {
    const token = await jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    return token;
  } catch (err) {
    throw Error(err);
  }
};
