const passport = require('passport');

module.exports = {
  callbackHandler: function (req, res) {
    passport.authenticate('github', { failureRedirect: '/login' }, function (err) {
      if (err) {
        res.status(403);
        return res.redirect('/login');
      }
      return res.redirect('/create');
    })(req, res);
  },
  authorize: function (req, res) {
    passport.authenticate('github', function (err, user, info) {
      if ((err) || (!user)) {
        res.status(403);
				return res.redirect('/login');
      }
      req.session.authenticated = true;
      req.session.userId = user.username;
      return res.redirect('/create');
    })(req, res);
  }
};
