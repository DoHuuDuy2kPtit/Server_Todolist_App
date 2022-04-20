const { Model } = require('objection');

class Job extends Model {
  static get tableName() {
    return 'jobs';
  }
}

module.exports = Job;
