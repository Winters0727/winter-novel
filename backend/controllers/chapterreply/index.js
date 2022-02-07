const jwt = require('jsonwebtoken');

const chapterReplyService = require('@/services/chapterreply');

const chapterReplyMessage = require('./message');

exports.postChapterReply = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id } = jwt.decode(token).data;

    const payload = { ...req.body, user: id };
    const data = await chapterReplyService.post(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: chapterReplyMessage.postSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getChapterReplys = async (req, res) => {
  try {
    const { query } = req;
    const data = await chapterReplyService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getChapterReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const data = await chapterReplyService.getByID(ReplyID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateChapterReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const payload = req.body;
    const data = await chapterReplyService.update(ReplyID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: chapterMessage.updateReplySuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteChapterReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const result = await chapterReplyService.delete(ReplyID);
    if (result) {
      return res.status(200).json({
        result: 'success',
        message: chapterReplyMessage.deleteSuccess,
      });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: chapterReplyMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
