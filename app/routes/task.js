const express = require('express');
const { auth } = require('../http/middlewares');
const { task: taskController } = require('../http/controllers');

const router = express.Router();

router.post('/jobs/:jobId/tasks', auth, taskController.addTask);
router.get('/jobs/:jobId/tasks', auth, taskController.getTasks);
router.put('/jobs/:jobId/tasks/:taskId', auth, taskController.updateTask);
router.delete('/jobs/:jobId/tasks/:taskId', auth, taskController.removeTask);
router.get('/jobs/:jobId/tasks/:taskId', auth, taskController.getTask);

module.exports = router;
