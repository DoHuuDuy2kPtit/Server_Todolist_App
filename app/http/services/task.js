const { transaction } = require('objection');

const { Task, User } = require('../../models');
const { abort } = require('../../helpers/error');
const taskStatus = require('../../enums/taskStatus');

exports.addTask = async ({ title, userId }) => {
  try {
    await transaction(Task, User, async (TaskTrx, UserTrx) => {
      await TaskTrx.query().insert({
        title,
        status: taskStatus.TODO,
        user_id: userId,
      });

      await UserTrx
        .query()
        .findById(userId)
        .increment('task_count', 1);
    });
  } catch (error) {
    return abort(400, 'Add task failed');
  }
  return '';
};

exports.getTasks = async ({ limit, offset, userId }) => {
  const tasks = await Task
    .query()
    .where('user_id', userId)
    .select('id', 'title', 'status')
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  const { task_count: total } = await User
    .query()
    .findById(userId)
    .select('task_count');
  return {
    tasks, total, limit, offset,
  };
};

exports.updateTask = async ({
  taskId, title, status, userId,
}) => {
  const task = await Task.query().findOne({ id: taskId });
  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.user_id !== userId) {
    abort(403, 'Forbidden');
  }
  try {
    await task.$query().patch({ title, status });
  } catch (error) {
    abort(500, 'Update task failed');
  }
};

exports.removeTask = async ({ taskId, userId }) => {
  const task = await Task.query().findById(taskId);

  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.user_id !== userId) {
    abort(403, 'Forbidden');
  }

  try {
    await transaction(User, Task, async (UserTrx, TaskTrx) => {
      await TaskTrx.query().deleteById(taskId);

      await UserTrx.query()
        .findById(userId)
        .decrement('task_count', 1);
    });
  } catch (error) {
    abort(500, 'Remove task failed');
  }
};

exports.getTask = async ({ taskId, userId }) => {
  const task = await Task.query()
    .findById(taskId)
    .select('id', 'title', 'status', 'user_id');

  if (!task) {
    abort(404, "Task doesn't exist");
  }
  if (task.user_id !== userId) {
    abort(403, 'Forbidden');
  }

  return task;
};
