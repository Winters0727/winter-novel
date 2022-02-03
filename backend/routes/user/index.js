const express = require('express');

const userController = require('@/controllers/user');
const loginController = require('@/controllers/login');

const router = express.Router();

router.post('/', userController.postUser);
router.get('/:id', loginController.isLogin, userController.getUser);
router.put('/:id', loginController.isLogin, userController.updateUser);
router.delete('/:id', loginController.isLogin, userController.deleteUser);

module.exports = router;
