const express = require('express');

const novelService = require('@/services/novel');

const novelController = require('@/controllers/novel');
const loginController = require('@/controllers/login');

const router = express.Router();

router.post('/', loginController.isLogin, novelController.postNovel);
router.get('/search/:keyword', novelController.getNovelsByKeyword);
router.get('/:id', novelController.getNovel);
router.put(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(novelService),
  novelController.updateNovel,
);
router.delete(
  '/:id',
  loginController.isLogin,
  loginController.isAuthorized(novelService),
  novelController.deleteNovel,
);

module.exports = router;
