const Joi = require('joi');

const taskServices = require('../../services/task');
const { abort } = require('../../../helpers/error');

const validate = async (params) => {
  const schema = Joi.object({
    taskId: Joi.number().integer().positive().required(),
    jobId: Joi.number().integer().positive().required(),
  });

  try {
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
};

const removeTask = async (req, res) => {
  const params = {
    taskId: req.params.taskId,
    jobId: req.params.jobId,
  };

  await validate(params);
  await taskServices.removeTask({ ...params });
  res.send(200).status({
    message: 'success',
  });
};

module.exports = removeTask;
