const { Job } = require('../../models');

exports.addJob = async ({ title, userId, res }) => {
  try {
    await Job.query().insert({
      title,
      user_id: userId,
    });
  } catch (error) {
    return res.status(400).send({
      message: 'Add job failed',
    });
  }

  return '';
};

exports.getJobs = async ({ limit, offset, userId }) => {
  const jobs = await Job
    .query()
    .where('user_id', userId)
    .select('id', 'title')
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    jobs, limit, offset,
  };
};
