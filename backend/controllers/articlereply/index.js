const jwt = require('jsonwebtoken');

const articleReplyService = require('@/services/articlereply');

const articleReplyMessage = require('./message');

exports.postArticleReply = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id, nickname } = jwt.decode(token).data;

    const payload = { ...req.body, user: id, nickname };
    const data = await articleReplyService.post(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: articleReplyMessage.postSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getArticleReplys = async (req, res) => {
  try {
    const { query } = req;
    const data = await articleReplyService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getArticleReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const data = await articleReplyService.getByID(ReplyID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateArticleReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const payload = req.body;
    const data = await articleReplyService.update(ReplyID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: articleMessage.updateReplySuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteArticleReply = async (req, res) => {
  try {
    const ReplyID = req.params.id;
    const result = await articleReplyService.delete(ReplyID);
    if (result) {
      return res.status(200).json({
        result: 'success',
        message: articleReplyMessage.deleteSuccess,
      });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: articleReplyMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
