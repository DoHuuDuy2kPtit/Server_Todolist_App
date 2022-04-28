const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const taskServices = require('../../services/task');

const validate = async (params) => {
  const schema = Joi.object({
    jobId: Joi.number().integer().min(1).required(),
    title: Joi.string().min(3).max(127).required(),
    dueDate: Joi.date().required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params error');
  }
};

const addTask = async (req, res) => {
  const task = {
    jobId: req.params.jobId,
    title: req.body.title,
    dueDate: req.body.dueDate,
  };
  await validate(task);
  await taskServices.addTask(task);
  return res.sendStatus(201);
};

module.exports = addTask;
