const userService = require('@/services/user');

exports.postUser = async (req, res) => {
  try {
    const payload = req.body;
    const data = await userService.postUser(payload);
    return res.status(201).json({
      result: 'success',
      data,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', err: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { query } = req;
    const data = await userService.getUsers(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', err: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await userService.getUser(userId);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', err: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const payload = req.body;
    const data = await userService.updateUser(userId, payload);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', err: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result) {
      return res.status(200).json({ result: 'success' });
    }
    return res.status(500).json({ result: 'fail' });
  } catch (err) {
    return res.status(500).json({ result: 'fail', err: err.message });
  }
};
