const Joi = require('joi');

const jobServices = require('../../services/job');

const validate = async (params, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(127).required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    res.status(400).send({
      message: 'Params error',
    });
  }
};

const addJob = async (req, res) => {
  const job = {
    title: req.body.title,
  };
  await validate(job, res);
  await jobServices.addJob({ ...job, userId: req.user.id, res });
  return res.status(201).send({
    message: 'success',
  });
};

module.exports = addJob;
