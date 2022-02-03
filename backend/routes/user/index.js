const express = require('express');

const userController = require('@/controllers/user');

const router = express.Router();

router.post('/', userController.postUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
