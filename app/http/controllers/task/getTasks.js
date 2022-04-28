const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const taskServices = require('../../services/task');

const validate = async (params) => {
  const schema = Joi.object({
    jobId: Joi.number().integer().positive().required(),
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  });
  try {
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
};

const getTasks = async (req, res) => {
  const params = {
    jobId: req.params.jobId,
    limit: req.query.limit,
    offset: req.query.offset,
  };
  await validate(params);
  const tasks = await taskServices.getTasks({ ...params });
  res.status(200).send(tasks);
};

module.exports = getTasks;
