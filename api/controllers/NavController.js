/**
 * NavController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createDeck: (req, res) => {
    if (!req.session.authenticated) {
      return res.redirect('/login');
    }

    res.view('pages/deck/create');
  },

  userDecks: (req, res) => {
    const id = _.get(req, 'session.userId');

    User
      .findOne({ id }, (err, user) => {
        if (err || !user) {
          return res.redirect('/login');
        }

        res.redirect('/' + user.username);
      });
  }
};

