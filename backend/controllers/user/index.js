const userService = require('@/services/user');

const userMessage = require('./message');

exports.postUser = async (req, res) => {
  try {
    const payload = req.body;
    const data = await userService.postUser(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: userMessage.postSuccessMessage,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { query } = req;
    const data = await userService.getUsers(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userService.getUser(userId);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const payload = req.body;
    const data = await userService.updateUser(userId, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: userMessage.updateSuccessMessage,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result) {
      return res
        .status(200)
        .json({ result: 'success', message: userMessage.deleteSuccessMessage });
    }
    return res
      .status(500)
      .json({ result: 'fail', message: userMessage.deleteFailMessage });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
