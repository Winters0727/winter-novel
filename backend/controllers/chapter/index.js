const jwt = require('jsonwebtoken');

const novelService = require('@/services/novel');
const chapterService = require('@/services/chapter');

const chapterMessage = require('./message');

exports.postChapter = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id } = jwt.decode(token).data;

    const NovelID = req.body.novel;
    const novelData = await novelService.getByID(NovelID);
    const authorID = novelData.user;

    if (id === authorID) {
      const payload = { ...req.body, user: id };
      const data = await chapterService.post(payload);
      return res.status(201).json({
        result: 'success',
        data,
        message: chapterMessage.postSuccess,
      });
    } else {
      return res.status(401).json({
        result: 'fail',
        meessage: chapterMessage.unauthorized,
      });
    }
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getChapters = async (req, res) => {
  try {
    const { query } = req;
    const data = await chapterService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getChapter = async (req, res) => {
  try {
    const ChapterID = req.params.id;
    const data = await chapterService.getByID(ChapterID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const ChapterID = req.params.id;
    const payload = req.body;
    const data = await chapterService.update(ChapterID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: chapterMessage.updateSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const ChapterID = req.params.id;
    const result = await chapterService.delete(ChapterID);
    if (result) {
      return res
        .status(200)
        .json({ result: 'success', message: chapterMessage.deleteSuccess });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: chapterMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.isAuthorized = async (req, res, next) => {
  const token = req.cookies['token'];
  const { id } = jwt.decode(token).data;

  const ChapterID = req.params.id;
  const chapterData = await chapterService.getByID(ChapterID);
  const NovelID = chapterData.dataValues.novel;

  const novelData = await novelService.getByID(NovelID);
  const { user } = novelData.dataValues;

  if (id === user) {
    next();
  } else {
    return res.status(401).json({
      result: 'fail',
      meessage: chapterMessage.unauthorized,
    });
  }
};
