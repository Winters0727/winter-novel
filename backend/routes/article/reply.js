const express = require('express');

const replyService = require('@/services/articlereply');

const replyController = require('@/controllers/articlereply');

const router = express.Router();

router.post('/', loginController.isLogin, replyController.postArticleReply);
router.get('/', replyController.getArticleReplys);
router.get('/:id', replyController.getArticleReply);
router.put(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(replyService),
  replyController.updateArticleReply,
);
router.delete(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(replyService),
  replyController.deleteArticleReply,
);

module.exports = router;
