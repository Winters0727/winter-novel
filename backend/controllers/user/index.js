const userService = require('@/services/user');
const hash = require('@/utils/hash');

const userMessage = require('./message');

exports.postUser = async (req, res) => {
  try {
    const hashedPassword = hash.createHashPassword(req.body.userPassword);
    const payload = { ...req.body, userPassword: hashedPassword };
    const data = await userService.post(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: userMessage.postSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { query } = req;
    const data = await userService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const data = await userService.getByID(userID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const payload = req.body;
    const data = await userService.update(userID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: userMessage.updateSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const result = await userService.delete(userID);
    if (result) {
      return res
        .status(200)
        .json({ result: 'success', message: userMessage.deleteSuccess });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: userMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
