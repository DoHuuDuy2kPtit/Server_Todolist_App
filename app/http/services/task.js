const { Task } = require('../../models');
const { abort } = require('../../helpers/error');
const taskStatus = require('../../enums/taskStatus');

exports.addTask = async ({ title, jobId, dueDate }) => {
  try {
    await Task.query().insert({
      title,
      status: taskStatus.TODO,
      job_id: jobId,
      due_date: dueDate,
    });
  } catch (error) {
    return abort(400, 'Add task failed');
  }
  return '';
};

exports.getTasks = async ({ limit, offset, jobId }) => {
  const tasks = await Task
    .query()
    .where('job_id', jobId)
    .select('id', 'title', 'status')
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    tasks, limit, offset,
  };
};

exports.updateTask = async ({
  taskId, title, status, jobId, dueDate, description,
}) => {
  const task = await Task.query().findOne({ id: taskId });
  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.job_id !== Number(jobId)) {
    abort(403, 'Forbidden');
  }
  try {
    await task.$query().patch({
      title,
      status,
      due_date: dueDate,
      description,
    });
  } catch (error) {
    abort(500, 'Update task failed');
  }
};

exports.removeTask = async ({ taskId, jobId }) => {
  const task = await Task.query().findById(taskId);

  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.user_id !== jobId) {
    abort(403, 'Forbidden');
  }

  try {
    await Task.query().deleteById(taskId);
  } catch (error) {
    abort(500, 'Remove task failed');
  }
};

exports.getTask = async ({ taskId, jobId }) => {
  const task = await Task.query()
    .findById(taskId)
    .select('id', 'title', 'status', 'job_id as jobId', 'description', 'due_date as dueDate');

  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.jobId !== Number(jobId)) {
    abort(403, 'Forbidden');
  }

  const date = new Date(task.dueDate);

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0'.concat(dd);
  if (mm < 10) mm = '0'.concat(mm);

  return {
    ...task,
    dueDate: `${dd}-${mm}'-'${yyyy}`,
  };
};
