const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const taskServices = require('../../services/task');

const validate = async (params) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(127).required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params error');
  }
};

const addTask = async (req, res) => {
  const task = {
    title: req.body.title,
  };
  await validate(task);
  await taskServices.addTask({ ...task, userId: req.user.id });
  return res.sendStatus(201);
};

module.exports = addTask;
