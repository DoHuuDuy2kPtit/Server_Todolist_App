const { Model } = require('objection');

class Task extends Model {
  static get tableName() {
    return 'tasks';
  }
}

module.exports = Task;
