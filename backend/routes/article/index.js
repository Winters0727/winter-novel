const express = require('express');

const articleService = require('@/services/article');

const articleController = require('@/controllers/article');
const loginController = require('@/controllers/login');

const replyRouter = require('@/routes/article/reply');

const router = express.Router();

router.post('/', loginController.isLogin, articleController.postArticle);
router.use('/reply', replyRouter);
router.get('/search/:keyword', articleController.getArticlesByKeyword);
router.get('/:id', articleController.getArticle);
router.put(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(articleService),
  articleController.updateArticle,
);
router.delete(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(articleService),
  articleController.deleteArticle,
);

module.exports = router;
