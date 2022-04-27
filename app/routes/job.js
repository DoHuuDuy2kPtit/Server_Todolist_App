const express = require('express');
const { auth } = require('../http/middlewares');
const { job: jobController } = require('../http/controllers');

const router = express.Router();

router.post('/jobs', auth, jobController.addJob);
router.get('/jobs', auth, jobController.getJobs);

module.exports = router;
