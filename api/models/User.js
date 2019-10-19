const bcrypt = require('bcrypt-nodejs');

module.exports = {
  attributes: {
    email: {
      type: 'email',
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
      type: 'string',
    },
    githubProfileData: {
      type: 'json'
    }
  },
  customToJSON: function() {
    return _.pick(this, ['email', 'username']);
  }
};
