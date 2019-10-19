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
      allowNull: true
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
      allowNull: true
    },
    githubProfileData: {
      type: 'json'
    }
  },
  customToJSON: function() {
    return _.pick(this, ['email', 'username']);
  }
};
