const bcrypt = require('bcrypt-nodejs');

module.exports = {
  schema: true,
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      unique: true
    },
    githubAccessToken: {
      type: 'string'
    },
    githubRefreshToken: {
      type: 'string'
    },
    githubProfileData: {
      type: 'json'
    }
  },
  customToJSON: function() {
    return _.pick(this, ['email', 'username']);
  }
};
