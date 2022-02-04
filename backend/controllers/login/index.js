const jwt = require('jsonwebtoken');

const userService = require('@/services/user');
const hash = require('@/utils/hash');
const token = require('@/utils/token');

const loginMessage = require('./message');

const TOKEN_MAXAGE = 86400 * 1000;

exports.login = async (req, res) => {
  try {
    const payload = req.body;
    const { userID, userPassword } = payload;
    const hashedPassword = hash.createHashPassword(userPassword);

    const data = await userService.getUserByUserID(userID);

    if (data) {
      const dataValues = data.dataValues;

      if (hashedPassword === dataValues.userPassword) {
        await data.update({ ...dataValues, lastLoginAt: new Date(Date.now()) });
        await data.save();

        const jwtToken = await token.createToken({
          id: dataValues.id,
          userID: dataValues.userID,
          nickname: dataValues.userNickname,
        });

        res.cookie('token', jwtToken, { maxAge: TOKEN_MAXAGE });
        return res.status(200).json({ result: 'success' });
      }
      return res
        .status(400)
        .json({ result: 'fail', message: loginMessage.wrongPassword });
    }

    res
      .status(400)
      .json({ result: 'fail', message: loginMessage.userIDNotExist });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.isLogin = async (req, res, next) => {
  try {
    const token = req.cookies['token'];
    if (token && jwt.verify(token, process.env.JWT_SECRET)) {
      next();
    } else {
      return res
        .status(401)
        .json({ result: 'fail', message: loginMessage.unauthorized });
    }
  } catch (err) {
    throw Error(err);
  }
};
