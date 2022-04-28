const Joi = require('joi');

const taskStatus = require('../../../enums/taskStatus');
const { abort } = require('../../../helpers/error');
const taskServices = require('../../services/task');

const validate = async (params) => {
  const schema = Joi.object({
    taskId: Joi.number().positive().required(),
    jobId: Joi.number().positive().required(),
    title: Joi.string().min(3).max(127),
    status: Joi.number().valid(...taskStatus.getValues()),
    description: Joi.string(),
    dueDate: Joi.date(),
  });
  try {
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
};

const updateTask = async (req, res) => {
  const params = {
    taskId: req.params.taskId,
    jobId: req.params.jobId,
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    dueDate: req.body.dueDate,
  };
  await validate(params);
  await taskServices.updateTask({ ...params, userId: req.user.id });
  res.sendStatus(204);
};

module.exports = updateTask;
