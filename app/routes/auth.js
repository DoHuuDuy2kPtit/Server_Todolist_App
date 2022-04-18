const express = require('express');

const { auth: authController } = require('../http/controllers');

const router = express.Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);

module.exports = router;
