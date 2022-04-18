const Joi = require('joi');

const taskServices = require('../../services/task');
const { abort } = require('../../../helpers/error');

const validate = async (params) => {
  const schema = Joi.object({
    taskId: Joi.number().integer().positive().required(),
  });

  try {
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
};

const getTask = async (req, res) => {
  const params = {
    taskId: req.params.taskId,
  };

  await validate(params);
  const task = await taskServices.getTask({ ...params, userId: req.user.id });
  res.status(200).send(task);
};

module.exports = getTask;
