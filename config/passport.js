require('dotenv').config();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK
  },
  function (accessToken, refreshToken, profile, done) {
    let user = {
      email: profile._json.email,
      username: profile.username,
      githubAccessToken: accessToken,
      githubRefreshToken: refreshToken,
      // githubProfileData: {
      //   displayName: profile.displayName
      // }
    };

    User.findOrCreate({
      username: user.username
    }, user, function (err, user) {
      return done(err, user);
    });
  }
));
