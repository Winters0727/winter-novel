const jwt = require('jsonwebtoken');

const articleService = require('@/services/article');

const articleMessage = require('./message');

exports.postArticle = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const { id, userNickname } = jwt.decode(token).data;

    const payload = { ...req.body, user: id, userNickname };
    const data = await articleService.post(payload);
    return res.status(201).json({
      result: 'success',
      data,
      message: articleMessage.postSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const { query } = req;
    const data = await articleService.get(query);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getArticlesByKeyword = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const data = await articleService.getByKeyword(keyword);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const ArticleID = req.params.id;
    const data = await articleService.getByID(ArticleID);
    return res.status(200).json({ result: 'success', data });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const ArticleID = req.params.id;
    const payload = req.body;
    const data = await articleService.update(ArticleID, payload);
    return res.status(200).json({
      result: 'success',
      data,
      message: articleMessage.updateSuccess,
    });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const ArticleID = req.params.id;
    const result = await articleService.delete(ArticleID);
    if (result) {
      return res
        .status(200)
        .json({ result: 'success', message: articleMessage.deleteSuccess });
    }
    return res
      .status(400)
      .json({ result: 'fail', message: articleMessage.deleteFail });
  } catch (err) {
    return res.status(500).json({ result: 'fail', message: err.message });
  }
};
