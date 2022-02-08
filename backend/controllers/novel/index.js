const jwt = require('jsonwebtoken');

const novelService = require('@/services/novel');

const novelMessage = require('./message');

exports.postNovel = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id, userNickname } = jwt.decode(token).data;

    const payload = { ...req.body, user: id, userNickname };
    const data = await novelService.post(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: novelMessage.postSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getNovels = async (req, res) => {
  try {
    const { query } = req;
    const data = await novelService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getNovelsByKeyword = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const data = await novelService.getByKeyword(keyword);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getNovel = async (req, res) => {
  try {
    const NovelID = req.params.id;
    const data = await novelService.getByID(NovelID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateNovel = async (req, res) => {
  try {
    const NovelID = req.params.id;
    const payload = req.body;
    const data = await novelService.update(NovelID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: novelMessage.updateSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteNovel = async (req, res) => {
  try {
    const NovelID = req.params.id;
    const result = await novelService.delete(NovelID);
    if (result) {
      return res
        .status(200)
        .json({ result: 'success', message: novelMessage.deleteSuccess });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: novelMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
