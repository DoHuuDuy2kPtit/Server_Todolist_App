const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const jobServices = require('../../services/job');

const validate = async (params) => {
  const schema = Joi.object({
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  });
  try {
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params error');
  }
};

const getJobs = async (req, res) => {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
  };
  await validate(params);
  const jobs = await jobServices.getJobs({ ...params, userId: req.user.id });
  res.status(200).send(jobs);
};

module.exports = getJobs;
