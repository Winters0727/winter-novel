const express = require('express');

const chapterController = require('@/controllers/chapter');
const loginController = require('@/controllers/login');

const router = express.Router();

router.post('/', loginController.isLogin, chapterController.postChapter);
router.get('/:id', chapterController.getChapter);
router.put(
  '/:id',
  loginController.isLogin,
  chapterController.isAuthorized,
  chapterController.updateChapter,
);
router.delete(
  '/:id',
  loginController.isLogin,
  chapterController.isAuthorized,
  chapterController.deleteChapter,
);

module.exports = router;
