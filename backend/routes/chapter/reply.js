const express = require('express');

const replyService = require('@/services/chapterreply');

const replyController = require('@/controllers/chapterreply');
const loginController = require('@/controllers/login');

const router = express.Router();

router.post('/', loginController.isLogin, replyController.postChapterReply);
router.get('/', replyController.getChapterReplys);
router.get('/:id', replyController.getChapterReply);
router.put(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(replyService),
  replyController.updateChapterReply,
);
router.delete(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(replyService),
  replyController.deleteChapterReply,
);

module.exports = router;
