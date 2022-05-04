const express = require('express');
const { auth } = require('../http/middlewares');
const { user: userController } = require('../http/controllers');

const router = express.Router();

router.put('/users/changepassword', auth, userController.changePassword);
router.put('/users/forgotpassword', userController.forgotPassword);
router.put('/users/profile', auth, userController.updateProfile);
router.get('/users/profile', auth, userController.getProfile);

module.exports = router;
