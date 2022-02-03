const jwt = require('jsonwebtoken');

const novelService = require('@/services/novel');

const novelMessage = require('./message');

exports.postNovel = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id } = jwt.decode(token).data;

    const payload = { ...req.body, user: id };
    const data = await novelService.postNovel(payload);
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
    const data = await novelService.getNovels(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getNovelsByKeyword = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const data = await novelService.getNovelsByKeyword(keyword);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getNovel = async (req, res) => {
  try {
    const NovelID = req.params.id;
    const data = await novelService.getNovelByID(NovelID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateNovel = async (req, res) => {
  try {
    const NovelID = req.params.id;
    const payload = req.body;
    const data = await novelService.updateNovel(NovelID, payload);
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
    const result = await novelService.deleteNovel(NovelID);
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

exports.isAuthorized = async (req, res, next) => {
  const token = req.cookies['token'];
  const { id } = jwt.decode(token).data;

  const NovelID = req.params.id;
  const data = await novelService.getNovelByID(NovelID);
  const { user } = data.dataValues;

  if (id === user) {
    next();
  } else {
    return res.status(401).json({
      result: 'fail',
      meessage: novelMessage.unauthorized,
    });
  }
};
