const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async hasEmail(email) {
    const user = await this.query().findOne({ email });

    if (user) {
      return true;
    }

    return false;
  }
}

module.exports = User;
