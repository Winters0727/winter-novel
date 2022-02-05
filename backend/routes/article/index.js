const express = require('express');

const articleController = require('@/controllers/article');
const loginController = require('@/controllers/login');

const router = express.Router();

router.post('/', loginController.isLogin, articleController.postArticle);
router.get('/search/:keyword', articleController.getArticlesByKeyword);
router.get('/:id', articleController.getArticle);
router.put(
  '/:id',
  loginController.isLogin,
  articleController.isAuthorized,
  articleController.updateArticle,
);
router.delete(
  '/:id',
  loginController.isLogin,
  articleController.isAuthorized,
  articleController.deleteArticle,
);

module.exports = router;
